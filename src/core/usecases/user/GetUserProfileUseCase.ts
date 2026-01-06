import { UserServicePort } from '../../ports/service/UserServicePort';
import { User } from '../../domain/User';

export class GetUserProfileUseCase {
    constructor(private userService: UserServicePort) {}

    async execute(): Promise<User> {
        return this.userService.getCurrentUser();
    }
}