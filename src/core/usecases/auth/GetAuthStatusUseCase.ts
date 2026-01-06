import { AuthServicePort } from '../../ports/service/AuthServicePort';
import { AuthStatus } from '../../domain/AuthStatus';

export class GetAuthStatusUseCase {
    constructor(private authService: AuthServicePort) {}

    async execute(): Promise<AuthStatus> {
        return this.authService.getAuthStatus();
    }
}