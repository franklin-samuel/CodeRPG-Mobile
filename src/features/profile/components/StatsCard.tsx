import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../../../core/domain/User';
import { colors } from '../../../styles/colors';
import { spacing } from '../../../styles/spacing';
import { typography } from '../../../styles/typography';

interface StatsCardProps {
    user: User;
}

export function StatsCard({ user }: StatsCardProps) {
    const stats = [
        { label: 'Total XP', value: user.totalXp.toLocaleString() },
        { label: 'Current Streak', value: `${user.currentStreak} days` },
        { label: 'Longest Streak', value: `${user.longestStreak} days` },
        { label: 'Followers', value: user.followersCount },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stats</Text>
            <View style={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <View key={index} style={styles.statItem}>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.secondary,
        padding: spacing.lg,
        borderRadius: 12,
    },
    title: {
        ...typography.h3,
        color: colors.text.primary,
        marginBottom: spacing.md,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    statItem: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: colors.background.tertiary,
        padding: spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    statValue: {
        ...typography.h2,
        color: colors.primary.main,
        marginBottom: spacing.xs,
    },
    statLabel: {
        ...typography.caption,
        color: colors.text.secondary,
    },
});