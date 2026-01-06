import { AuthServicePort } from '../../ports/service/AuthServicePort';

export class LogoutUseCase {
    constructor(private authService: AuthServicePort) {}

    async execute(): Promise<void> {
        await this.authService.logout();
    }
}