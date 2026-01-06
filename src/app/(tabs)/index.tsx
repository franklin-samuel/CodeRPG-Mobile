import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useProfile } from '../../features/profile/hooks/useProfile';
import { ProfileHeader } from '../../features/profile/components/ProfileHeader';
import { StatsCard } from '../../features/profile/components/StatsCard';
import { Loading } from '../../shared/components/Loading';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

export default function HomeScreen() {
    const { profile, isLoading, error } = useProfile();

    if (isLoading) {
        return <Loading />;
    }

    if (error || !profile) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load profile</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.greeting}>Welcome back, {profile.name || profile.githubUsername}!</Text>

            <ProfileHeader user={profile} />

            <View style={styles.section}>
                <StatsCard user={profile} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    content: {
        padding: spacing.lg,
        gap: spacing.lg,
    },
    greeting: {
        ...typography.h2,
        color: colors.text.primary,
    },
    section: {
        gap: spacing.md,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.primary,
    },
    errorText: {
        ...typography.body,
        color: colors.error,
    },
});