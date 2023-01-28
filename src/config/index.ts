import { config } from "dotenv"
config()
export const { PORT, MONGODB_URI, ACCESS_TOKEN, MAIL_SERVICE, MAIL_PASS, MAIL_USER } = process.env