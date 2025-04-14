import { Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

export function NamespacedResolver(type: typeof Query | typeof Mutation, field: string): ClassDecorator {
  return (classRef) => {
    @ObjectType(classRef.name.replace('Resolver', ''))
    class Namespace {}

    Resolver(Namespace)(classRef);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    classRef.prototype[field] = function namespace() {
      return {};
    };

    const descriptor = Object.getOwnPropertyDescriptor(classRef.prototype, field)!;

    type(() => Namespace)(classRef.prototype, field, descriptor);
  };
}
