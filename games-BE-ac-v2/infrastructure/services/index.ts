import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';

interface Props {
  stack: string;
  vpc: awsx.ec2.Vpc;
}

export function configureServices({ stack, vpc }: Props) {
  const cluster = new aws.ecs.Cluster(`cluster-${stack}`);

  const namespace = new aws.servicediscovery.PrivateDnsNamespace(`namespace-${stack}`, {
    vpc: vpc.vpcId,
    name: 'service.local',
  });

  new aws.servicediscovery.Service(`ge-service-discovery-${stack}`, {
    name: 'game-engines',
    description: 'For game engines aviatorx, crash, slide',
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

  return { cluster, namespace };
}

export * from './diamonds';
export * from './dice';
export * from './federation';
export * from './gateway-ws';
export * from './hilo';
export * from './limbo';
export * from './management';
export * from './mines';
export * from './players';
export * from './plinko';
