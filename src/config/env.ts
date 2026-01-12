import Constants from 'expo-constants';

const ENV = {
    API_BASE_URL: Constants.expoConfig?.extra?.API_BASE_URL || 'https://coderpg-backend.onrender.com/api',
    GITHUB_CLIENT_ID: Constants.expoConfig?.extra?.GITHUB_CLIENT_ID || 'Iv23lizb9J480Bdfy3vJ',
};

export default ENV;