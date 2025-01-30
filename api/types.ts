import {Model, ObjectId} from "mongoose";

export interface ArtistMutation {
    name: string;
    description: string | null;
    image: string | null;
}

export interface AlbumMutation {
    name: string;
    artist: ObjectId;
    date: Date;
    image: string | null;
    user: ObjectId | undefined;
    isPublished: boolean;
}

export interface ITrack {
    _id: ObjectId;
    name: string;
    album: ObjectId;
    duration: string;
    trackNumber: number;
    isPublished: boolean;
}

export type TrackMutation = Omit<ITrack, '_id'>;

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
}

export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface ITrackHistory {
    _id: ObjectId;
    user: ObjectId;
    track: ObjectId;
    date: string;
}