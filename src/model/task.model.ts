import moment from "moment";
import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    addedAt: {
        type: Date,
        default: () => moment().toDate(),
    },
    updatedAt:{
        timestamps:true
    }
})

const taskModel = model<Document>("Review", taskSchema);

export default taskModel
