import { Task } from "../interfaces/model.interface";
import mongoose from "mongoose";
declare const _default: mongoose.Model<Task, {}, {}, {}, mongoose.Document<unknown, {}, Task> & Task & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, mongoose.Schema<Task, mongoose.Model<Task, any, any, any, mongoose.Document<unknown, any, Task> & Task & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Task, mongoose.Document<unknown, {}, mongoose.FlatRecord<Task>> & mongoose.FlatRecord<Task> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>>;
export default _default;
