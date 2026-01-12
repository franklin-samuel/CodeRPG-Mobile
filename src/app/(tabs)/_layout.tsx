import React, { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Loading } from '../../shared/components/Loading';
import { colors } from '../../styles/colors';

export default function TabsLayout() {
    const { authStatus, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.replace('/auth/log-in');
            } else if (authStatus?.needsOnBoarding) {
                router.replace('/auth/onboarding');
            }
        }
    }, [isAuthenticated, isLoading, authStatus]);

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthenticated || authStatus?.needsOnBoarding) {
        return null;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary.main,
                tabBarInactiveTintColor: colors.text.tertiary,
                tabBarStyle: {
                    backgroundColor: colors.background.secondary,
                    borderTopColor: colors.border.primary,
                },
                headerStyle: {
                    backgroundColor: colors.background.secondary,
                },
                headerTintColor: colors.text.primary,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>🏠</span>,
                }}
            />
            <Tabs.Screen
                name="missions"
                options={{
                    title: 'Missions',
                    tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>⚔️</span>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>👤</span>,
                }}
            />
        </Tabs>
    );
}