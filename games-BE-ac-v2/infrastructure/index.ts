import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import { configureNetwork } from './network';
import {
  configureDiamonds,
  configureDice,
  configureFederation,
  configureGatewayWS,
  configureHilo,
  configureLimbo,
  configureManagement,
  configureMines,
  configurePlayers,
  configurePlinko,
  configureServices,
} from './services';

const stack = pulumi.getStack();

const { vpc, federationSg, websocketSG, servicesSg, lb, wsTargetGroup, federationTargetGroup } = configureNetwork({
  stack,
});
const { cluster, namespace } = configureServices({ stack, vpc });

// Create an IAM role for ECS Task execution
const ecsTaskExecutionRole = new aws.iam.Role('provfair-be-ecsTaskExecutionRole', {
  name: 'provfair-be-ecsTaskExecutionRole',
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Principal: {
          Service: 'ecs-tasks.amazonaws.com',
        },
      },
    ],
  }),
});

// Attach the managed policy "AmazonECSTaskExecutionRolePolicy"
new aws.iam.RolePolicyAttachment('ecsTaskExecutionRolePolicyAttachment', {
  role: ecsTaskExecutionRole,
  policyArn: 'arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy',
});

// Create an inline policy to allow reading .env from S3
new aws.iam.RolePolicy('s3EnvReadPolicy', {
  name: 'Read-provfair-s3-envs',
  role: ecsTaskExecutionRole,
  policy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Action: 's3:GetObject',
        Resource: 'arn:aws:s3:::provfair-ecs-env/*',
      },
      {
        Effect: 'Allow',
        Action: 's3:GetBucketLocation',
        Resource: 'arn:aws:s3:::provfair-ecs-env',
      },
    ],
  }),
});

const playerService = configurePlayers({ stack, vpc, cluster, namespace, servicesSg, ecsTaskExecutionRole });
const managementService = configureManagement({ stack, vpc, cluster, namespace, servicesSg, ecsTaskExecutionRole });
const diceService = configureDice({ stack, vpc, cluster, namespace, servicesSg, ecsTaskExecutionRole });
const diamondsService = configureDiamonds({ stack, vpc, cluster, namespace, servicesSg, ecsTaskExecutionRole });
const hiloService = configureHilo({ stack, vpc, cluster, namespace, servicesSg, ecsTaskExecutionRole });
const limboService = configureLimbo({ stack, vpc, cluster, namespace, servicesSg, ecsTaskExecutionRole });
const plinkoService = configurePlinko({ stack, vpc, cluster, namespace, servicesSg, ecsTaskExecutionRole });
const minesService = configureMines({ stack, vpc, cluster, namespace, servicesSg, ecsTaskExecutionRole });

configureFederation({
  stack,
  vpc,
  cluster,
  federationSg,
  lb,
  namespace,
  playerService,
  federationTargetGroup,
  managementService,
  ecsTaskExecutionRole,
  diceService,
  diamondsService,
  hiloService,
  limboService,
  plinkoService,
  minesService,
});

configureGatewayWS({ stack, vpc, cluster, websocketSG, wsTargetGroup, ecsTaskExecutionRole });

export const vpcId = vpc.vpcId;
export const privateSubnetIds = vpc.privateSubnetIds;
export const publicSubnetIds = vpc.publicSubnetIds;
export const defaultSecurityGroupId = vpc.vpc.defaultSecurityGroupId;
// export const defaultTargetGroupId = lb.defaultTargetGroup.id;
export const federationSecurityGroupId = federationSg.id;
export const servicesSecurityGroupId = servicesSg.id;
export const url = pulumi.interpolate`http://${lb.dnsName}`;
