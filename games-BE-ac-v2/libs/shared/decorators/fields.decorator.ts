/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, Type } from '@nestjs/common';
import { GqlTypeReference, ResolveField, ResolveFieldOptions } from '@nestjs/graphql';
import { getPaginatedComplexity } from '@provfair/modules/graphql/complexity/get-paginated-complexity';
import { NotValidServerError } from '@provfair/modules/graphql/errors/server/not-valid.error';
import { getOrCreatePaginatedType, isPaginatedClass } from '@provfair/modules/graphql/types/paginated.base';
import { IsInternalOnly } from './internalOnly.decorator';
import { IsAuthenticated } from './isAuthenticated.decorator';

function SimpleFieldResolver(typeRef: GqlTypeReference, options?: ResolveFieldOptions): MethodDecorator {
  if (isPaginatedClass(Array.isArray(typeRef) ? typeRef[0] : typeRef)) {
    throw new NotValidServerError({
      context: SimpleFieldResolver,
      message: `${SimpleField.name} does not support a paginated class as argument. Use ${PaginatedField.name}.`,
    });
  }

  return ResolveField(() => typeRef, options);
}

export function SimpleField({
  typeRef,
  isAuth = true,
  options,
  internalOnly = false,
}: {
  typeRef: GqlTypeReference;
  isAuth?: boolean;
  options?: ResolveFieldOptions;
  internalOnly?: boolean;
}): MethodDecorator {
  return applyDecorators(SimpleFieldResolver(typeRef, options), IsAuthenticated(isAuth), IsInternalOnly(internalOnly));
}

function PaginatedFieldResolver(typeRef: Type<{}>, options?: ResolveFieldOptions): MethodDecorator {
  if (Array.isArray(typeRef)) {
    throw new NotValidServerError({
      context: PaginatedFieldResolver,
      message: `${PaginatedField.name} does not support an array as argument. Use ${SimpleField.name}.`,
    });
  }

  const paginatedType = getOrCreatePaginatedType(typeRef);

  return ResolveField(() => paginatedType, {
    complexity: ({ args, childComplexity }) => getPaginatedComplexity(args, childComplexity),
    ...options,
  });
}

export function PaginatedField({
  typeRef,
  isAuth = true,
  options,
  internalOnly = false,
}: {
  typeRef: Type<{}>;
  isAuth?: boolean;
  options?: ResolveFieldOptions;
  internalOnly?: boolean;
}): MethodDecorator {
  return applyDecorators(
    PaginatedFieldResolver(typeRef, options),
    IsAuthenticated(isAuth),
    IsInternalOnly(internalOnly),
  );
}
