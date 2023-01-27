import { config } from "dotenv"
config()
export const { PORT, MONGODB_URI, ACCESS_TOKEN, MAIL_SERVICE } = process.env