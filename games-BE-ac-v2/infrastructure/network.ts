import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';

interface Props {
  stack: string;
}

export function configureNetwork({ stack }: Props) {
  const vpc = new awsx.ec2.Vpc(`vpc-${stack}`, {
    cidrBlock: '10.0.0.0/16',
    numberOfAvailabilityZones: 2,
    enableDnsHostnames: true,
  });

  const federationSg = new aws.ec2.SecurityGroup(`federation-${stack}`, {
    vpcId: vpc.vpcId,
    ingress: [
      {
        protocol: 'tcp',
        fromPort: 3000,
        toPort: 3000,
        cidrBlocks: ['0.0.0.0/0'],
      },
      { protocol: 'tcp', fromPort: 80, toPort: 80, cidrBlocks: ['0.0.0.0/0'] },
    ],
    egress: [{ protocol: '-1', fromPort: 0, toPort: 0, cidrBlocks: ['0.0.0.0/0'] }],
  });

  const websocketSG = new aws.ec2.SecurityGroup(`websocket-${stack}`, {
    vpcId: vpc.vpcId,
    ingress: [
      {
        protocol: 'tcp',
        fromPort: 3001,
        toPort: 3001,
        cidrBlocks: ['0.0.0.0/0'],
      },
      { protocol: 'tcp', fromPort: 80, toPort: 80, cidrBlocks: ['0.0.0.0/0'] },
    ],
    egress: [{ protocol: '-1', fromPort: 0, toPort: 0, cidrBlocks: ['0.0.0.0/0'] }],
  });

  const servicesSg = new aws.ec2.SecurityGroup(`services-${stack}`, {
    vpcId: vpc.vpcId,
    ingress: [
      {
        protocol: 'tcp',
        fromPort: 3002,
        toPort: 3002,
        cidrBlocks: ['0.0.0.0/0'],
      },
      {
        protocol: 'tcp',
        fromPort: 3004,
        toPort: 3004,
        cidrBlocks: ['0.0.0.0/0'],
      },
      {
        protocol: 'tcp',
        fromPort: 3007,
        toPort: 3007,
        cidrBlocks: ['0.0.0.0/0'],
      },
      {
        protocol: 'tcp',
        fromPort: 3008,
        toPort: 3008,
        cidrBlocks: ['0.0.0.0/0'],
      },
      {
        protocol: 'tcp',
        fromPort: 3009,
        toPort: 3009,
        cidrBlocks: ['0.0.0.0/0'],
      },
      {
        protocol: 'tcp',
        fromPort: 3010,
        toPort: 3010,
        cidrBlocks: ['0.0.0.0/0'],
      },
      {
        protocol: 'tcp',
        fromPort: 3011,
        toPort: 3011,
        cidrBlocks: ['0.0.0.0/0'],
      },
      {
        protocol: 'tcp',
        fromPort: 3012,
        toPort: 3012,
        cidrBlocks: ['0.0.0.0/0'],
      },
    ],
    // needs outbound access to pull images from ECR (you can allow to ECR CIDR by creating a vpc endpoint)
    egress: [{ protocol: '-1', fromPort: 0, toPort: 0, cidrBlocks: ['0.0.0.0/0'] }],
  });

  const federationTargetGroup = new aws.lb.TargetGroup(`fed-tg-${stack}`, {
    port: 3000,
    protocol: 'HTTP',
    targetType: 'ip',
    vpcId: vpc.vpcId,
    healthCheck: {
      path: '/health',
      interval: 30,
      timeout: 15,
      healthyThreshold: 2,
      unhealthyThreshold: 2,
    },
  });

  const wsTargetGroup = new aws.lb.TargetGroup(`ws-tg-${stack}`, {
    port: 3001,
    protocol: 'HTTP',
    targetType: 'ip',
    vpcId: vpc.vpcId,
    healthCheck: {
      path: '/health',
      interval: 30,
      timeout: 15,
      healthyThreshold: 2,
      unhealthyThreshold: 2,
    },
  });

  const lb = new aws.lb.LoadBalancer(`lb-${stack}`, {
    loadBalancerType: 'application',
    subnets: vpc.publicSubnetIds,
    securityGroups: [federationSg.id, websocketSG.id],
  });

  const httpListener = new aws.lb.Listener(`lb-listener-${stack}`, {
    loadBalancerArn: lb.arn,
    port: 80,
    protocol: 'HTTP',
    defaultActions: [
      {
        type: 'forward',
        targetGroupArn: federationTargetGroup.arn,
      },
    ],
  });

  new aws.lb.ListenerRule(`websocket-rule`, {
    listenerArn: httpListener.arn,
    tags: { Name: 'websocket-rule' },
    priority: 100,
    actions: [
      {
        type: 'forward',
        targetGroupArn: wsTargetGroup.arn,
      },
    ],
    conditions: [
      {
        pathPattern: {
          values: ['/socket*'],
        },
      },
    ],
  });

  return { vpc, federationSg, servicesSg, websocketSG, lb, wsTargetGroup, federationTargetGroup };
}
