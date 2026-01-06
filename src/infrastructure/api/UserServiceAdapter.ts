import {CompleteOnboardingData, UserServicePort} from '../../core/ports/service/UserServicePort';
import { HttpClientPort } from '../../core/ports/http/HttpClientPort';
import { User } from '../../core/domain/User';

export class UserServiceAdapter implements UserServicePort {
    constructor(private httpClient: HttpClientPort) {}

    async getCurrentUser(): Promise<User> {
        return this.httpClient.get<User>('/users/me');
    }

    async getUserById(id: string): Promise<User> {
        return this.httpClient.get<User>(`/users/${id}`);
    }

    async completeOnBoarding(data: CompleteOnboardingData): Promise<User> {
        return this.httpClient.put<User>('/users/me/onboarding', data);
    }
}