import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';
import { FargateService } from '@pulumi/awsx/ecs';

interface Props {
  stack: string;
  vpc: awsx.ec2.Vpc;
  cluster: aws.ecs.Cluster;
  federationSg: aws.ec2.SecurityGroup;
  lb: aws.lb.LoadBalancer;
  namespace: aws.servicediscovery.PrivateDnsNamespace;
  playerService: FargateService;
  managementService: FargateService;
  federationTargetGroup: aws.lb.TargetGroup;
  ecsTaskExecutionRole: aws.iam.Role;
  diceService: FargateService;
  diamondsService: FargateService;
  hiloService: FargateService;
  limboService: FargateService;
  plinkoService: FargateService;
  minesService: FargateService;
}

export function configureFederation({
  stack,
  vpc,
  cluster,
  namespace,
  federationSg,
  lb,
  playerService,
  federationTargetGroup,
  managementService,
  ecsTaskExecutionRole,
  diceService,
  minesService,
  diamondsService,
  plinkoService,
  hiloService,
  limboService,
}: Props) {
  const federationServiceDiscovery = new aws.servicediscovery.Service(`federation-service-discovery-${stack}`, {
    name: 'federation',
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

  const federationRepository = new awsx.ecr.Repository(`federation-${stack}`);

  const federationImage = new awsx.ecr.Image(`federation-${stack}`, {
    repositoryUrl: federationRepository.url,
    platform: 'linux/amd64',
    context: '../',
    args: {
      APP: 'federation',
    },
  });

  const federationService = new awsx.ecs.FargateService(
    'federation-service',
    {
      cluster: cluster.arn,
      taskDefinitionArgs: {
        executionRole: {
          roleArn: ecsTaskExecutionRole.arn,
        },
        logGroup: { args: { retentionInDays: 1 } },
        container: {
          name: `federation-${stack}`,
          image: federationImage.imageUri,
          cpu: 128,
          memory: 256,
          portMappings: [{ containerPort: 3000, targetGroup: federationTargetGroup }],
          healthCheck: {
            command: ['CMD-SHELL', 'curl -f http://localhost:${APP_PORT}/health || exit 1'],
            interval: 30,
            timeout: 5,
            retries: 3,
          },
          environmentFiles: [
            {
              value: 'arn:aws:s3:::provfair-ecs-env/.env.federation.env',
              type: 's3',
            },
          ],
        },
      },
      networkConfiguration: {
        subnets: vpc.publicSubnetIds,
        securityGroups: [federationSg.id],
        assignPublicIp: true,
      },
      serviceRegistries: {
        registryArn: federationServiceDiscovery.arn,
      },
      desiredCount: 1,
    },
    {
      dependsOn: [
        playerService,
        managementService,
        ecsTaskExecutionRole,
        diceService,
        diamondsService,
        hiloService,
        minesService,
        plinkoService,
        limboService,
      ],
    },
  );
}
