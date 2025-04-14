import { SetMetadata } from '@nestjs/common';

export const AUTHENTICATED_KEY = 'authenticated';
export const IsAuthenticated = (isAuth: boolean) => SetMetadata(AUTHENTICATED_KEY, isAuth);
