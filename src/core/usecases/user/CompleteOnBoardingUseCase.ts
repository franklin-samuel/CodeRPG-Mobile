import { UserServicePort, CompleteOnboardingData } from '../../ports/service/UserServicePort';
import { User } from '../../domain/User';

export class CompleteOnboardingUseCase {
    constructor(private userService: UserServicePort) {}

    async execute(data: CompleteOnboardingData): Promise<User> {
        if (!data.name || data.name.trim().length === 0) {
            throw new Error('Name is required');
        }

        if (!data.classType) {
            throw new Error('Class type is required');
        }

        return this.userService.completeOnBoarding(data);
    }
}