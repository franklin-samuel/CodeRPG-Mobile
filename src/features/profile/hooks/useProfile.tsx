import { useQuery } from '@tanstack/react-query';
import { getUserProfileUseCase } from '../../../config/di-container';

export function useProfile() {
    const { data: profile, isLoading, error, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getUserProfileUseCase.execute(),
    });

    return {
        profile,
        isLoading,
        error,
        refetch,
    };
}