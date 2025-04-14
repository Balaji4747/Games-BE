import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';

interface Props {
  stack: string;
  vpc: awsx.ec2.Vpc;
  cluster: aws.ecs.Cluster;
  websocketSG: aws.ec2.SecurityGroup;
  wsTargetGroup: aws.lb.TargetGroup;
  ecsTaskExecutionRole: aws.iam.Role;
}

export function configureGatewayWS({ stack, vpc, cluster, websocketSG, wsTargetGroup, ecsTaskExecutionRole }: Props) {
  const gatewayWSRepository = new awsx.ecr.Repository(`gatewayWS-ecr-repo-${stack}`);

  const gatewayWSImage = new awsx.ecr.Image(`gatewayWS-image-${stack}`, {
    repositoryUrl: gatewayWSRepository.url,
    platform: 'linux/amd64',
    context: '../',
    args: {
      APP: 'gateway-ws',
    },
  });

  const gatewayWSService = new awsx.ecs.FargateService(
    'gatewayWS-service',
    {
      cluster: cluster.arn,
      taskDefinitionArgs: {
        executionRole: {
          roleArn: ecsTaskExecutionRole.arn,
        },
        logGroup: { args: { retentionInDays: 1 } },
        container: {
          name: `gatewayWS-${stack}`,
          image: gatewayWSImage.imageUri,
          cpu: 128,
          memory: 256,
          portMappings: [{ containerPort: 3001, targetGroup: wsTargetGroup }],
          healthCheck: {
            command: ['CMD-SHELL', 'curl -f http://localhost:${APP_PORT}/health || exit 1'],
            interval: 30,
            timeout: 5,
            retries: 3,
          },
          environmentFiles: [
            {
              value: 'arn:aws:s3:::provfair-ecs-env/.env.gateway-ws.env',
              type: 's3',
            },
          ],
        },
      },
      networkConfiguration: {
        subnets: vpc.publicSubnetIds,
        securityGroups: [websocketSG.id],
        assignPublicIp: true,
      },
      desiredCount: 1,
    },
    { dependsOn: [ecsTaskExecutionRole] },
  );
}
