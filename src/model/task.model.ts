import moment from "moment";
import { Schema, model } from "mongoose";

initialValues: {
    name: "",
        starting: null,
            ends: null,
                people: []
},

const taskSchema = new Schema({
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
        timestamps: true
    }
})

const taskModel = model<Document>("Review", taskSchema);

export default taskModel
