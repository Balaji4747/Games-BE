import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';
import { AuthUser } from '../auth-user.interface';

export * from './IGameEvents';
export * from './IRooms';

interface CustomRequest extends IncomingMessage {
  currentUser: AuthUser;
}

export interface AuthenticatedSocket<T> extends Socket<T> {
  request: CustomRequest;
}
