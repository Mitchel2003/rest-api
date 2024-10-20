import { Country as TypeCountry, State as TypeState, City as TypeCity } from "../interfaces/model.interface";
import mongoose from "mongoose";
export declare const City: mongoose.Model<TypeCity, {}, {}, {}, mongoose.Document<unknown, {}, TypeCity> & TypeCity & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, mongoose.Schema<TypeCity, mongoose.Model<TypeCity, any, any, any, mongoose.Document<unknown, any, TypeCity> & TypeCity & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, TypeCity, mongoose.Document<unknown, {}, mongoose.FlatRecord<TypeCity>> & mongoose.FlatRecord<TypeCity> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>>;
export declare const State: mongoose.Model<TypeState, {}, {}, {}, mongoose.Document<unknown, {}, TypeState> & TypeState & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, mongoose.Schema<TypeState, mongoose.Model<TypeState, any, any, any, mongoose.Document<unknown, any, TypeState> & TypeState & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, TypeState, mongoose.Document<unknown, {}, mongoose.FlatRecord<TypeState>> & mongoose.FlatRecord<TypeState> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>>;
export declare const Country: mongoose.Model<TypeCountry, {}, {}, {}, mongoose.Document<unknown, {}, TypeCountry> & TypeCountry & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, mongoose.Schema<TypeCountry, mongoose.Model<TypeCountry, any, any, any, mongoose.Document<unknown, any, TypeCountry> & TypeCountry & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, TypeCountry, mongoose.Document<unknown, {}, mongoose.FlatRecord<TypeCountry>> & mongoose.FlatRecord<TypeCountry> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>>;
