import { Schema } from "mongoose";

interface ITask{
    user:Schema.Types.ObjectId,
    name: String,  
    starts: Date,
    ends: Date,
    people: string[],
    isComplete:boolean,
    addedAt: Date,
    updatedAt: Date,
}

export default ITask