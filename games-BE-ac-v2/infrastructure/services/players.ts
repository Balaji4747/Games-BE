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

export function configurePlayers({ stack, vpc, cluster, namespace, servicesSg, ecsTaskExecutionRole }: Props) {
  const playersServiceDiscovery = new aws.servicediscovery.Service(`players-service-discovery-${stack}`, {
    name: 'players',
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

  const playersRepository = new awsx.ecr.Repository(`players-ecr-repo-${stack}`);

  const playersImage = new awsx.ecr.Image(`players-image-${stack}`, {
    repositoryUrl: playersRepository.url,
    platform: 'linux/amd64',
    context: '../',
    args: {
      APP: 'players',
    },
  });

  const playersService = new awsx.ecs.FargateService(
    'players-service',
    {
      cluster: cluster.arn,
      taskDefinitionArgs: {
        executionRole: {
          roleArn: ecsTaskExecutionRole.arn,
        },
        logGroup: { args: { retentionInDays: 1 } },
        container: {
          name: `players-${stack}`,
          image: playersImage.imageUri,
          cpu: 128,
          memory: 256,
          portMappings: [{ containerPort: 3002 }],
          healthCheck: {
            command: ['CMD-SHELL', 'curl -f http://localhost:${APP_PORT}/health || exit 1'],
            interval: 30,
            timeout: 5,
            retries: 3,
          },
          environmentFiles: [
            {
              value: 'arn:aws:s3:::provfair-ecs-env/.env.players.env',
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
        registryArn: playersServiceDiscovery.arn,
      },
      desiredCount: 1,
    },
    { dependsOn: [ecsTaskExecutionRole] },
  );

  return playersService;
}
