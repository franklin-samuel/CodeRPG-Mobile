import { HttpClientAdapter } from '../infrastructure/http/HttpClientAdapter';
import { StorageServiceAdapter } from '../infrastructure/storage/StorageServiceAdapter';
import { AuthServiceAdapter } from '../infrastructure/api/AuthServiceAdapter';
import { UserServiceAdapter } from '../infrastructure/api/UserServiceAdapter';
import { GetAuthStatusUseCase } from '../core/usecases/auth/GetAuthStatusUseCase';
import { LogoutUseCase } from '../core/usecases/auth/LogoutUseCase';
import { GetUserProfileUseCase } from '../core/usecases/user/GetUserProfileUseCase';
import {CompleteOnboardingUseCase} from "../core/usecases/user/CompleteOnBoardingUseCase";

// Infrastructure
const httpClient = new HttpClientAdapter();
const storageService = new StorageServiceAdapter();

// Services
const authService = new AuthServiceAdapter(httpClient);
const userService = new UserServiceAdapter(httpClient);

// Use Cases
export const getAuthStatusUseCase = new GetAuthStatusUseCase(authService);
export const logoutUseCase = new LogoutUseCase(authService);
export const getUserProfileUseCase = new GetUserProfileUseCase(userService);
export const completeOnboardingUseCase = new CompleteOnboardingUseCase(userService)

export { storageService };