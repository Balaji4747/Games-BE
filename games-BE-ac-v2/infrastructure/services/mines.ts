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

const gameName = 'mines';

export function configureMines({ stack, vpc, cluster, namespace, servicesSg, ecsTaskExecutionRole }: Props) {
  const serviceDiscovery = new aws.servicediscovery.Service(`${gameName}-service-discovery-${stack}`, {
    name: gameName,
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

  const repository = new awsx.ecr.Repository(`${gameName}-ecr-repo-${stack}`);

  const image = new awsx.ecr.Image(`${gameName}-image-${stack}`, {
    repositoryUrl: repository.url,
    platform: 'linux/amd64',
    context: '../',
    args: {
      APP: gameName,
    },
  });

  const service = new awsx.ecs.FargateService(
    `${gameName}-service`,
    {
      cluster: cluster.arn,
      taskDefinitionArgs: {
        executionRole: {
          roleArn: ecsTaskExecutionRole.arn,
        },
        logGroup: { args: { retentionInDays: 1 } },
        container: {
          name: `${gameName}-${stack}`,
          image: image.imageUri,
          cpu: 128,
          memory: 256,
          portMappings: [{ containerPort: 3011 }],
          healthCheck: {
            command: ['CMD-SHELL', 'curl -f http://localhost:${APP_PORT}/health || exit 1'],
            interval: 30,
            timeout: 5,
            retries: 3,
          },
          environmentFiles: [
            {
              value: `arn:aws:s3:::provfair-ecs-env/.env.${gameName}.env`,
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
        registryArn: serviceDiscovery.arn,
      },
      desiredCount: 1,
    },
    { dependsOn: [ecsTaskExecutionRole] },
  );

  return service;
}
