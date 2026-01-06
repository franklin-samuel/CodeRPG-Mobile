import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import { getAuthStatusUseCase, logoutUseCase } from '../../../config/di-container';
import ENV from '../../../config/env';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
};

export function useAuth() {
    const queryClient = useQueryClient();

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: ENV.GITHUB_CLIENT_ID,
            scopes: ['user', 'repo', 'read:org'],
            redirectUri: makeRedirectUri({
                scheme: 'coderpg',
            }),
        },
        discovery
    );

    const { data: authStatus, isLoading, refetch } = useQuery({
        queryKey: ['authStatus'],
        queryFn: () => getAuthStatusUseCase.execute(),
        retry: false,
    });

    const logoutMutation = useMutation({
        mutationFn: () => logoutUseCase.execute(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authStatus'] });
            queryClient.clear();
        },
    });

    useEffect(() => {
        if (response?.type === 'success') {
            refetch();
        }
    }, [response]);

    const login = async () => {
        await promptAsync();
    };

    const logout = async () => {
        await logoutMutation.mutateAsync();
    };

    return {
        authStatus,
        isLoading,
        isAuthenticated: authStatus?.authenticated ?? false,
        login,
        logout,
        isLoggingOut: logoutMutation.isPending,
    };
}