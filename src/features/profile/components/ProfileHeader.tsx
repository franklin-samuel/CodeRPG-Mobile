import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { User, CLASS_DISPLAY_NAMES } from '../../../core/domain/User';
import { colors } from '../../../styles/colors';
import { spacing } from '../../../styles/spacing';
import { typography } from '../../../styles/typography';

interface ProfileHeaderProps {
    user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    const classDisplayName = user.classType ? CLASS_DISPLAY_NAMES[user.classType] : 'No Class';

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: user.avatarUrl || 'https://via.placeholder.com/100' }}
                style={styles.avatar}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{user.name || user.githubUsername}</Text>
                <Text style={styles.class}>{classDisplayName}</Text>
                <View style={styles.levelContainer}>
                    <Text style={styles.level}>Level {user.level}</Text>
                    <View style={styles.xpContainer}>
                        <Text style={styles.xp}>{user.xp} XP</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: spacing.lg,
        backgroundColor: colors.background.secondary,
        borderRadius: 12,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: colors.primary.main,
    },
    info: {
        flex: 1,
        marginLeft: spacing.md,
    },
    name: {
        ...typography.h2,
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    class: {
        ...typography.body,
        color: colors.primary.main,
        marginBottom: spacing.sm,
    },
    levelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    level: {
        ...typography.h3,
        color: colors.text.primary,
    },
    xpContainer: {
        backgroundColor: colors.primary.main,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 6,
    },
    xp: {
        ...typography.caption,
        color: colors.background.primary,
        fontWeight: '600',
    },
});