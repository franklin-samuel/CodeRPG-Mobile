import Constants from 'expo-constants';

const ENV = {
    API_BASE_URL: Constants.expoConfig?.extra?.API_BASE_URL || '',
    GITHUB_CLIENT_ID: Constants.expoConfig?.extra?.GITHUB_CLIENT_ID || '',
};

export default ENV;