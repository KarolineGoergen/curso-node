import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface IStudent {
    name: string;
    mail: string;
    password: string;
    age: number;
    createdAt: string | Date;
}

export const studentSchema = new Schema<IStudent>({
    name: {
        type: String
    },
    mail: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
    
});

export const Student = mongoose.model<IStudent>('Student', studentSchema);