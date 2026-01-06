import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useProfile } from '../../features/profile/hooks/useProfile';
import { ProfileHeader } from '../../features/profile/components/ProfileHeader';
import { StatsCard } from '../../features/profile/components/StatsCard';
import { Button } from '../../shared/components/Button';
import { Loading } from '../../shared/components/Loading';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

export default function ProfileScreen() {
    const { logout, isLoggingOut } = useAuth();
    const { profile, isLoading } = useProfile();

    if (isLoading) {
        return <Loading />;
    }

    if (!profile) {
        return null;
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Profile</Text>

            <ProfileHeader user={profile} />

            <StatsCard user={profile} />

            <Button
                title="Logout"
                onPress={logout}
                variant="secondary"
                loading={isLoggingOut}
            />
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
    title: {
        ...typography.h1,
        color: colors.text.primary,
    },
});