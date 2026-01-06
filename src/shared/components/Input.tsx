import React from 'react';
import { TextInput, Text, View, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    error && styles.inputError,
                    style,
                ]}
                placeholderTextColor={colors.text.tertiary}
                {...props}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.xs,
    },
    label: {
        ...typography.body,
        color: colors.text.primary,
        fontWeight: '600',
    },
    input: {
        backgroundColor: colors.background.secondary,
        borderWidth: 2,
        borderColor: colors.border.primary,
        borderRadius: 8,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        ...typography.body,
        color: colors.text.primary,
        minHeight: 48,
    },
    inputError: {
        borderColor: colors.error,
    },
    error: {
        ...typography.caption,
        color: colors.error,
    },
});