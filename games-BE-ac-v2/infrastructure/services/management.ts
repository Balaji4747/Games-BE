import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';

interface Props {
  stack: string;
  vpc: awsx.ec2.Vpc;
  cluster: aws.ecs.Cluster;
  namespace: aws.servicediscovery.PrivateDnsNamespace;
  servicesSg: aws.ec2.SecurityGroup;
  ecsTaskExecutionRole: aws.iam.Role;
}

export function configureManagement({ stack, vpc, cluster, namespace, servicesSg, ecsTaskExecutionRole }: Props) {
  const managementServiceDiscovery = new aws.servicediscovery.Service(`management-service-discovery-${stack}`, {
    name: 'management',
    dnsConfig: {
      namespaceId: namespace.id,
      dnsRecords: [
        {
          ttl: 10,
          type: 'A',
        },
      ],
    },
    healthCheckCustomConfig: {
      failureThreshold: 1,
    },
  });

  const managementRepository = new awsx.ecr.Repository(`management-ecr-repo-${stack}`);

  const managementImage = new awsx.ecr.Image(`management-image-${stack}`, {
    repositoryUrl: managementRepository.url,
    platform: 'linux/amd64',
    context: '../',
    args: {
      APP: 'management',
    },
  });

  const managementService = new awsx.ecs.FargateService(
    'management-service',
    {
      cluster: cluster.arn,
      taskDefinitionArgs: {
        executionRole: {
          roleArn: ecsTaskExecutionRole.arn,
        },
        logGroup: { args: { retentionInDays: 1 } },
        container: {
          name: `management-${stack}`,
          image: managementImage.imageUri,
          cpu: 128,
          memory: 256,
          portMappings: [{ containerPort: 3004 }],
          healthCheck: {
            command: ['CMD-SHELL', 'curl -f http://localhost:${APP_PORT}/health || exit 1'],
            interval: 30,
            timeout: 5,
            retries: 3,
          },
          environmentFiles: [
            {
              value: 'arn:aws:s3:::provfair-ecs-env/.env.management.env',
              type: 's3',
            },
          ],
        },
      },
      networkConfiguration: {
        subnets: vpc.privateSubnetIds,
        securityGroups: [servicesSg.id],
      },
      serviceRegistries: {
        registryArn: managementServiceDiscovery.arn,
      },
      desiredCount: 1,
    },
    { dependsOn: [ecsTaskExecutionRole] },
  );

  return managementService;
}
