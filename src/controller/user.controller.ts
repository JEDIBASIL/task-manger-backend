import { NextFunction, Response, Request } from "express";
import { CreateAccountDto } from "../dto/user.dto";
import UserService from "../services/user.service";
import HttpResponse from "../response/HttpResponse";
import Mail from "../mail/mail";
import JwtToken from "../utils/jwt";
import FileHandler from "../utils/fileHandler";
import MailOptions from "../mail/mailOption";

class UserController {
    private userService = new UserService()
    private mail = new Mail();
    private jwt = new JwtToken();
    private fileHandler = new FileHandler()
    createAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: CreateAccountDto = req.body;
            const { email, username } = data
            const verificationToken =  this.jwt.signJwt(email, "600s");
            const emailTemplate = this.fileHandler.templateReader(`verify.hbs`, { username, link: `http://localhost:3000/verify/${verificationToken}` })
            const newAccount = await this.userService.createAccount(data)
            if (!newAccount) return res.status(500).send(new HttpResponse("failed", "an error occurred"))
            await this.mail.sendMail(new MailOptions(email, "verify account", await emailTemplate))
            return res.status(200).send(new HttpResponse("success", "account created successfully", newAccount))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }
}

export default UserController