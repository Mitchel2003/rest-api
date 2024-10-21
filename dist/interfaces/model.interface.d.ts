import { Document, Schema } from "mongoose";
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    access: boolean;
    isVerified: boolean;
    verificationToken?: string;
    verificationExpiresAt?: Date;
    resetPasswordToken?: string;
    resetPasswordExpiresAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Task extends Document {
    title: string;
    description: string;
    date: Date;
    user: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Curriculum extends Document {
    title: string;
    description: string;
    date: Date;
    user: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Country extends Document {
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface State extends Document {
    name: string;
    country: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface City extends Document {
    name: string;
    state: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
