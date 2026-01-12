import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import { getAuthStatusUseCase, logoutUseCase } from '../../../config/di-container';
import ENV from '../../../config/env';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
};

const scheme = 'coderpg';
const redirectUri = makeRedirectUri({
    scheme,
});

export function useAuth() {
    const queryClient = useQueryClient();

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: ENV.GITHUB_CLIENT_ID,
            scopes: ['user', 'repo', 'read:org'],
            redirectUri,
        },
        discovery
    );

    const loginBackendMutation = useMutation({
        mutationFn: async (code) => {

            console.log('Enviando para o backend:', {
                code,
                redirectUri: redirectUri,
            })

            const response = await axios.post(`${ENV.API_BASE_URL}/auth/login`, {
                code,
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authStatus'] });
        },
        onError: (error) => {
            console.error('Erro ao logar no backend:', error);
        }
    });

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
            const { code } = response.params;
            console.log('Código recebido do GitHub:', code);

            loginBackendMutation.mutate(code);
        } else if (response?.type === 'error') {
            console.error('Erro no AuthSession:', response.error);
        }
    }, [response]);

    const login = async () => {
        await promptAsync();
    };

    return {
        authStatus,
        isLoading: isLoading || loginBackendMutation.isPending,
        isAuthenticated: authStatus?.authenticated ?? false,
        login,
        logout: () => logoutMutation.mutateAsync(),
        isLoggingOut: logoutMutation.isPending,
    };
}