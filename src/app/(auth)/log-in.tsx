import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Button } from '../../shared/components/Button';
import { Loading } from '../../shared/components/Loading';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

export default function LoginScreen() {
    const { login, authStatus, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && authStatus) {
            if (authStatus.needsOnBoarding) {
                router.replace('/(auth)/onboarding');
            } else {
                router.replace('/(tabs)');
            }
        }
    }, [isAuthenticated, authStatus]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>⚔️</Text>
                    <Text style={styles.title}>CodeRPG</Text>
                    <Text style={styles.subtitle}>Level up your coding skills</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Login with GitHub"
                        onPress={login}
                    />
                    <Text style={styles.disclaimer}>
                        Sign in to track your coding journey and earn XP
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: spacing.lg,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 80,
        marginBottom: spacing.md,
    },
    title: {
        ...typography.h1,
        color: colors.primary.main,
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...typography.body,
        color: colors.text.secondary,
        textAlign: 'center',
    },
    buttonContainer: {
        gap: spacing.md,
    },
    disclaimer: {
        ...typography.caption,
        color: colors.text.tertiary,
        textAlign: 'center',
    },
});