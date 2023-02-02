import moment from "moment";
import { Schema, model } from "mongoose";
import ICategory from "../interface/category.interface";

const categorySchema = new Schema<ICategory>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    addedAt: {
        type: Date,
        default: () => moment().toDate()
    }
})

const categoryModel = model<Document & ICategory>("Category", categorySchema)

export default categoryModel