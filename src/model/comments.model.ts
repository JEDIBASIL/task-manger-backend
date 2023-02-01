import moment from "moment";
import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    addedAt: {
        type: Date,
        default: () => moment().toDate()
    }
})

const categoryModel = model("Comments", categorySchema)

export default categoryModel