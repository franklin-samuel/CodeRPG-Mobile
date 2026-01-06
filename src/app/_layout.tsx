import React from 'react';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../config/queryClient';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </QueryClientProvider>
    );
}