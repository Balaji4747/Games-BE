import { SetMetadata } from '@nestjs/common';

export const INTERNAL_ONLY_KEY = 'internalOnly';
export const IsInternalOnly = (internalOnly: boolean) => SetMetadata(INTERNAL_ONLY_KEY, internalOnly);
