import { config } from "dotenv"
config()
export const { PORT, DATABASE_URL, ACCESS_TOKEN, MAIL_SERVICE } = process.env