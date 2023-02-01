import moment from "moment";
import { Schema, model } from "mongoose";
import ITask from "../interface/task.interface";


const taskSchema = new Schema<ITask>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        require: true
    },
    starts: {
        type: Date,
        required: true
    },
    ends: {
        type: Date,
        required: true
    },
    people: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    isComplete: {
        type: Boolean,
        default: false
    },
    addedAt: {
        type: Date,
        default: () => moment().toDate(),
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

const taskModel = model<Document & ITask>("Task", taskSchema);

export default taskModel
