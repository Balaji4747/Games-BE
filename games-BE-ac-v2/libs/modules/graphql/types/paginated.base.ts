import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { BigIntResolver } from 'graphql-scalars';

/* eslint max-classes-per-file: 0 */

export class Paginated<T> {
  public static __isPaginatedClass__ = true;
  public totalItems!: number;
  public items!: T[];
  public totalPages!: number;
  public page!: number;
  public limit!: number;
  public morePages?: boolean;
}

export function isPaginatedClass(classRef: Type<unknown>): classRef is typeof Paginated {
  return (classRef as typeof Paginated).__isPaginatedClass__;
}

export function BasePaginated<T>(classRef: Type<T>): Type<Paginated<T>> {
  @ObjectType({ isAbstract: true })
  class PaginatedClassWithDecorators extends Paginated<T> {
    @Field(() => BigIntResolver)
    public totalItems!: number;

    @Field(() => [classRef])
    public items!: T[];

    @Field(() => BigIntResolver)
    public totalPages!: number;

    @Field(() => BigIntResolver)
    public page!: number;

    @Field(() => BigIntResolver)
    public limit!: number;

    @Field({ nullable: true })
    public morePages?: boolean;
  }

  return PaginatedClassWithDecorators;
}

export function createPaginatedType<ObjectType>(objectTypeRef: Type<ObjectType>): Type<Paginated<ObjectType>> {
  @ObjectType(`Paginated${objectTypeRef.name}`)
  class PaginatedClass extends BasePaginated(objectTypeRef) {}

  return PaginatedClass;
}

export const paginatedTypes = new Map<Type<unknown>, Type<Paginated<unknown>>>();

export function getOrCreatePaginatedType<ObjectType>(objectTypeRef: Type<ObjectType>): Type<Paginated<ObjectType>> {
  if (isPaginatedClass(objectTypeRef)) {
    return objectTypeRef;
  }

  if (!paginatedTypes.has(objectTypeRef)) {
    paginatedTypes.set(objectTypeRef, createPaginatedType(objectTypeRef));
  }

  return paginatedTypes.get(objectTypeRef) as Type<Paginated<ObjectType>>;
}
