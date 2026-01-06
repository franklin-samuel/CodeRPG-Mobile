import * as SecureStore from 'expo-secure-store';
import { StorageServicePort } from '../../core/ports/storage/StorageServicePort';

export class StorageServiceAdapter implements StorageServicePort {
    async getItem(key: string): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.error('Error getting item from secure storage:', error);
            return null;
        }
    }

    async setItem(key: string, value: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.error('Error setting item in secure storage:', error);
            throw error;
        }
    }

    async removeItem(key: string): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error('Error removing item from secure storage:', error);
            throw error;
        }
    }

    async clear(): Promise<void> {
        // SecureStore doesn't have a clear all method
        // You would need to track keys separately if needed
        console.warn('Clear all not implemented for SecureStore');
    }
}