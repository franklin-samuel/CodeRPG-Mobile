import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../../features/auth/hooks/useOnBoarding';
import { ClassSelector } from '../../features/auth/components/ClassSelector';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { ClassType } from '../../core/domain/User';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

export default function OnboardingScreen() {
    const [name, setName] = useState('');
    const [selectedClass, setSelectedClass] = useState<ClassType | undefined>();
    const [errors, setErrors] = useState<{ name?: string; classType?: string }>({});

    const { completeOnboarding, isLoading } = useOnboarding();
    const router = useRouter();

    const validate = () => {
        const newErrors: { name?: string; classType?: string } = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!selectedClass) {
            newErrors.classType = 'Please select a class';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleComplete = async () => {
        if (!validate()) return;

        try {
            await completeOnboarding({
                name: name.trim(),
                classType: selectedClass!,
            });
            router.replace('/(tabs)');
        } catch (error: any) {
            setErrors({ name: error.message || 'Failed to complete onboarding' });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.emoji}>⚔️</Text>
                    <Text style={styles.title}>Welcome, Adventurer!</Text>
                    <Text style={styles.subtitle}>
                        Complete your profile to start your coding journey
                    </Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Your Name"
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={(text) => {
                            setName(text);
                            if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        error={errors.name}
                        autoCapitalize="words"
                        autoCorrect={false}
                    />

                    <ClassSelector
                        selectedClass={selectedClass}
                        onSelect={(classType) => {
                            setSelectedClass(classType);
                            if (errors.classType) setErrors({ ...errors, classType: undefined });
                        }}
                        error={errors.classType}
                    />
                </View>

                <Button
                    title="Start Adventure"
                    onPress={handleComplete}
                    loading={isLoading}
                    disabled={!name.trim() || !selectedClass}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    content: {
        padding: spacing.lg,
        gap: spacing.xl,
    },
    header: {
        alignItems: 'center',
        gap: spacing.sm,
        paddingTop: spacing.xl,
    },
    emoji: {
        fontSize: 64,
    },
    title: {
        ...typography.h1,
        color: colors.primary.main,
    },
    subtitle: {
        ...typography.body,
        color: colors.text.secondary,
        textAlign: 'center',
    },
    form: {
        gap: spacing.xl,
    },
});