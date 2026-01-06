import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
}

export function Button({
   onPress,
   title,
   variant = 'primary',
   disabled = false,
   loading = false,
   style
}: ButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === 'secondary' && styles.buttonSecondary,
                disabled && styles.buttonDisabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? colors.background.primary : colors.primary.main} />
            ) : (
                <Text style={[
                    styles.text,
                    variant === 'secondary' && styles.textSecondary,
                    disabled && styles.textDisabled,
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary.main,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary.main,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    text: {
        ...typography.body,
        color: colors.background.primary,
        fontWeight: '600',
    },
    textSecondary: {
        color: colors.primary.main,
    },
    textDisabled: {
        color: colors.text.tertiary,
    },
});