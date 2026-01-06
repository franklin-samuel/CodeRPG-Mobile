import {ClassType, User} from '../../domain/User';

export interface CompleteOnboardingData {
    name: string;
    classType: ClassType
}

export interface UserServicePort {
    getCurrentUser(): Promise<User>;
    getUserById(id: string): Promise<User>;
    completeOnBoarding(data: CompleteOnboardingData): Promise<User>;
}