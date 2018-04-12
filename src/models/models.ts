export interface UserInfo {
    id: string;
    name: string;
    role: string;
    email: string;
    photoUrl: string;
    instrument: string;
}

export interface NewUser {
    name: string;
    password: string;
    role: string;
    email: string;
    instrument: string;
    photoUrl?: string;
}

export interface FriendShort {
    id: string;
    name: string;
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
    userId: string;
}

export interface Comment {
    userId: string;
    message: string;
    date: number;
    name: string;
    photoUrl: string;
}

export interface Event {
    title: string;
    description: string;
    location: string;
    locationCoords: { lat: number, lng: number };
    date: number;
    image: string;
}

export interface Request {
    userId: string;
    id: string;
    name: string;
    photoUrl: string;
}

export interface Login {
    email: string;
    password: string;
}