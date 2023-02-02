import { Schema } from "mongoose";

interface ICategory{
    user: Schema.Types.ObjectId,
    name:string;
    addedAt:Date
}

export default ICategory