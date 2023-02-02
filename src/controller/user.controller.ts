import { NextFunction, Response, Request } from "express";
import { CreateAccountDto, LoginDto, ResetPasswordDto } from "../dto/user.dto";
import UserService from "../services/user.service";
import HttpResponse from "../response/HttpResponse";
import Mail from "../mail/mail";
import JwtToken from "../utils/jwt";
import FileHandler from "../utils/fileHandler";
import MailOptions from "../mail/mailOption";
import HttpException from "../error/HttpException";
import { JwtPayload } from "jsonwebtoken";
import logger from "../utils/logger";
import { WEB_URL } from "../config";

class UserController {
    private service = new UserService()
    private mail = new Mail();
    private jwt = new JwtToken();
    private fileHandler = new FileHandler()
    createAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: CreateAccountDto = req.body;
            const { email, username } = data
            const verificationToken = this.jwt.signJwt(email, "600s");
            const emailTemplate = this.fileHandler.templateReader(`verify.hbs`, { username, link: `${WEB_URL}/verify/${verificationToken}` })
            const newAccount = await this.service.createAccount(data)
            if (!newAccount) return res.status(500).send(new HttpResponse("failed", "an error occurred"))
            await this.mail.sendMail(new MailOptions(email, "verify account", await emailTemplate))
            return res.status(200).send(new HttpResponse("success", "account created successfully"))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }


    verify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token } = req.body
            if (!token) throw new HttpException(400, "token is required")
            const { value }: JwtPayload | string = this.jwt.verifyJwt(token)
            const isVerifiedAccount = await this.service.verify(value)
            if (isVerifiedAccount)
                return res.status(200).send(new HttpResponse("success", "account verified successfully"))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    resendVerificationMail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body
            const verificationToken = this.jwt.signJwt(email, "600s");
            const emailTemplate = this.fileHandler.templateReader(`verify.hbs`, { link: `${WEB_URL}/verify/${verificationToken}` })
            await this.mail.sendMail(new MailOptions(email, "verify account", await emailTemplate))
            return res.status(200).send(new HttpResponse("success", "mail sent"))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    sendResetPasswordMail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body
            const verificationToken = this.jwt.signJwt(email, "600s");
            const emailTemplate = this.fileHandler.templateReader(`verify.hbs`, { link: `${WEB_URL}/reset-password/${verificationToken}` })
            await this.mail.sendMail(new MailOptions(email, "verify account", await emailTemplate))
            return res.status(200).send(new HttpResponse("success", "mail sent"))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password }: LoginDto = req.body
            const user = await this.service.loginAccount({ password, email })
            if (user) {
                const accessToken = this.jwt.signJwt(user.username, "30d")
                return res.status(200).send(new HttpResponse("success", "account authenticated", { accessToken }))
            }
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }
    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: ResetPasswordDto = req.body
            const { value }: JwtPayload | string = this.jwt.verifyJwt(data.token)
            data.token = value
            const user = await this.service.resetPassword(data)
            if (user) return res.status(200).send(new HttpResponse("success", "password changed"))
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }


}

export default UserController