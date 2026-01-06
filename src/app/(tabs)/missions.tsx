import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

export default function MissionsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Missions</Text>
            <Text style={styles.subtitle}>Coming soon...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
        padding: spacing.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        ...typography.h1,
        color: colors.text.primary,
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...typography.body,
        color: colors.text.secondary,
    },
});