export interface UserInfo {
    id: string;
    name: string;
    role: string;
    email: string;
    photoUrl: string;
}

export interface MessageInfo {
    photoUrl: string;
    name: string;
    role: string;
    text: string;
    id: string;
    youtubeUrl?: string;
    comments: number;
    likes: number;
    date: number;
}

export interface Event {
    title: string;
    description: string;
    location: string;
    date: number;
    image: string;
}