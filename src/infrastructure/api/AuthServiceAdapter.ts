import { AuthServicePort } from '../../core/ports/service/AuthServicePort';
import { HttpClientPort } from '../../core/ports/http/HttpClientPort';
import { AuthStatus } from '../../core/domain/AuthStatus';

export class AuthServiceAdapter implements AuthServicePort {
    constructor(private httpClient: HttpClientPort) {}

    async getAuthStatus(): Promise<AuthStatus> {
        return this.httpClient.get<AuthStatus>('/auth/status');
    }

    async logout(): Promise<void> {
        await this.httpClient.post('/auth/logout');
    }
}