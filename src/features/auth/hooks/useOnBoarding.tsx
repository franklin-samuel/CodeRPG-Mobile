import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboardingUseCase } from '../../../config/di-container';
import { CompleteOnboardingData } from '../../../core/ports/service/UserServicePort';

export function useOnboarding() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: CompleteOnboardingData) => completeOnboardingUseCase.execute(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authStatus'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });

    return {
        completeOnboarding: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}