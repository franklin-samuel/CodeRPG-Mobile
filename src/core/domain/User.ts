export enum ClassType {
    FRONTEND = 'FRONTEND',
    BACKEND = 'BACKEND',
    FULLSTACK = 'FULLSTACK',
    DATA_ENGINEER = 'DATA_ENGINEER',
    DEVOPS = 'DEVOPS',
    MOBILE = 'MOBILE',
}

export const CLASS_DISPLAY_NAMES: Record<ClassType, string> = {
    [ClassType.FRONTEND]: 'Frontend Mage',
    [ClassType.BACKEND]: 'Backend Knight',
    [ClassType.FULLSTACK]: 'Full Stack Warrior',
    [ClassType.DATA_ENGINEER]: 'Data Elf',
    [ClassType.DEVOPS]: 'DevOps Assassin',
    [ClassType.MOBILE]: 'Mobile Ranger',
};

export interface User {
    id: string;
    githubId: number;
    githubUsername: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
    website?: string;
    classType?: ClassType;
    classDisplayName?: string;
    level: number;
    xp: number;
    totalXp: number;
    githubPublicRepos?: number;
    githubFollowers?: number;
    githubFollowing?: number;
    currentStreak: number;
    longestStreak: number;
    followersCount: number;
    followingCount: number;
    createdAt: string;
    modifiedAt: string;
}