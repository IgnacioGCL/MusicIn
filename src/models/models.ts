export type UserInfo = {
    id: string;
    name: string;
    role: string;
    email: string;
    photoUrl: string;
    instrument: string;
}

export type NewUser = {
    name: string;
    password: string;
    role: string;
    email: string;
    instrument: string;
    photoUrl?: string;
}

export type FriendShort = {
    id: string;
    name: string;
}

export type MessageInfo = {
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
    richContent?: string;
}

export type Comment = {
    userId: string;
    message: string;
    date: number;
    name: string;
    photoUrl: string;
}

export type Event = {
    title: string;
    description: string;
    location: string;
    locationCoords: { lat: number, lng: number };
    date: number;
    image: string;
    imageUrl?: string;
}

export type Offer = {
    image: string;
    title: string;
    contactMobile: number;
    contactEmail: string;
    description: string;
    location: string;
    locationCoords: { lat: number, lng: number };
    imageUrl?: string;
}

export type Request = {
    userId: string;
    id: string;
    name: string;
    photoUrl: string;
}

export type Login = {
    email: string;
    password: string;
}

export type Chat = {
    friendName: string;
    friendPhotoUrl: string;
    startDate: number;
    chatRoomId: string;
}

export type ChatMessage = {
    content: string;
    who: string;
    cssClass: string;
}