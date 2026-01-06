import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ClassType, CLASS_DISPLAY_NAMES } from '../../../core/domain/User';
import { colors } from '../../../styles/colors';
import { spacing } from '../../../styles/spacing';
import { typography } from '../../../styles/typography';

interface ClassSelectorProps {
    selectedClass?: ClassType;
    onSelect: (classType: ClassType) => void;
    error?: string;
}

const CLASS_ICONS: Record<ClassType, string> = {
    [ClassType.FRONTEND]: '🎨',
    [ClassType.BACKEND]: '⚔️',
    [ClassType.FULLSTACK]: '🛡️',
    [ClassType.DATA_ENGINEER]: '🧙',
    [ClassType.DEVOPS]: '🥷',
    [ClassType.MOBILE]: '🏹',
};

const CLASS_DESCRIPTIONS: Record<ClassType, string> = {
    [ClassType.FRONTEND]: 'Master of interfaces and user experience',
    [ClassType.BACKEND]: 'Guardian of servers and databases',
    [ClassType.FULLSTACK]: 'Warrior who conquers all territories',
    [ClassType.DATA_ENGINEER]: 'Mystic who reveals data secrets',
    [ClassType.DEVOPS]: 'Silent executor of deployments',
    [ClassType.MOBILE]: 'Hunter of mobile platforms',
};

export function ClassSelector({ selectedClass, onSelect, error }: ClassSelectorProps) {
    const classes = Object.values(ClassType);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose your class</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {classes.map((classType) => {
                    const isSelected = selectedClass === classType;
                    return (
                        <TouchableOpacity
                            key={classType}
                            style={[
                                styles.classCard,
                                isSelected && styles.classCardSelected,
                            ]}
                            onPress={() => onSelect(classType)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.icon}>{CLASS_ICONS[classType]}</Text>
                            <Text style={[
                                styles.className,
                                isSelected && styles.classNameSelected,
                            ]}>
                                {CLASS_DISPLAY_NAMES[classType]}
                            </Text>
                            <Text style={styles.description}>
                                {CLASS_DESCRIPTIONS[classType]}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },
    title: {
        ...typography.h3,
        color: colors.text.primary,
    },
    scrollContent: {
        gap: spacing.md,
        paddingHorizontal: spacing.xs,
    },
    classCard: {
        width: 200,
        backgroundColor: colors.background.secondary,
        borderWidth: 2,
        borderColor: colors.border.primary,
        borderRadius: 12,
        padding: spacing.lg,
        alignItems: 'center',
        gap: spacing.sm,
    },
    classCardSelected: {
        borderColor: colors.primary.main,
        backgroundColor: colors.background.tertiary,
    },
    icon: {
        fontSize: 48,
    },
    className: {
        ...typography.h3,
        color: colors.text.primary,
        textAlign: 'center',
    },
    classNameSelected: {
        color: colors.primary.main,
    },
    description: {
        ...typography.caption,
        color: colors.text.secondary,
        textAlign: 'center',
    },
    error: {
        ...typography.caption,
        color: colors.error,
        textAlign: 'center',
    },
});