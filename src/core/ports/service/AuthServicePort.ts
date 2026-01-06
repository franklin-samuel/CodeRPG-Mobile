import { AuthStatus } from '../../domain/AuthStatus';

export interface AuthServicePort {
    getAuthStatus(): Promise<AuthStatus>;
    logout(): Promise<void>;
}