import { Schema } from "mongoose";

interface ITask{
    user:Schema.Types.ObjectId,
    category:Schema.Types.ObjectId,
    name: String,  
    starts: Date,
    ends: Date,
    description:string,
    people: string[],
    isComplete:boolean,
    addedAt: Date,
    updatedAt: Date,
}

export default ITask