import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({ timestamps: true })
export class Todo extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: false, default: "" })
    description: string

    @Prop({ default: false })
    isCompleted: boolean;

    @Prop({ default: false })
    isDeleted: boolean
}

export const TodoSchema = SchemaFactory.createForClass(Todo)