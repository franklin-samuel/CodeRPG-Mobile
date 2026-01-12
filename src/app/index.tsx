import { Redirect } from 'expo-router';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Loading } from '../shared/components/Loading';

export default function Index() {
    const { isAuthenticated, isLoading, authStatus } = useAuth();

    if (isLoading) return <Loading />;

    if (!isAuthenticated) {
        return <Redirect href="/auth/log-in" />;
    }

    if (authStatus?.needsOnBoarding) {
        return <Redirect href="/auth/onboarding" />;
    }

    return <Redirect href="/(tabs)" />;
}