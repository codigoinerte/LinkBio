import type { User } from '../types/user.interface.ts';

interface UserMockData extends User{
    password: string;
}
export const users: UserMockData[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        bio: 'Frontend developer and coffee enthusiast.',
        createdAt: new Date(),
        isActive: true,
        username: 'alice-johnson',
        lastSignIn: new Date(),
        token: 'yYqWW3IFhvHK1JMLZRSDzSQKTahiFTKU7PVkZpu6S6VtedLg5FmWMe2Yw4bKVrIB',
        password: '@pass111999',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
    },
    {
        id: '2',
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
        bio: 'Backend engineer who loves open source.',
        createdAt: new Date('2023-02-20T14:30:00Z'),
        isActive: false,
        username: 'bob-smith',
        lastSignIn: new Date('2023-02-21T10:00:00Z'),
        token: 'MwbXCkUXJMwR754PflMDPG1YYKJEYOyAP1sihDh0kjyC8eHsA2lawYCzTfKKJq6i',
        password: '@pass111999',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
    },
    {
        id: '3',
        name: 'Clara Lee',
        email: 'clara.lee@example.com',
        avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
        bio: 'Fullstack developer and avid reader.',
        createdAt: new Date('2023-03-10T09:15:00Z'),
        isActive: true,
        username: 'clara-lee',
        lastSignIn: new Date('2023-03-11T08:45:00Z'),
        token: 'zy7SaCK9bTDarKMYgJkosdSEAcgtwVA4Vy6Gk5vR1Hl9OT5vCTiY1FF3v7qmi26q',
        password: '@pass111999',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
    },
];