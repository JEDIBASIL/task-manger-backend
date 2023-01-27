import { NextFunction, Response, Request } from "express";
import { CreateAccountDto } from "../dto/user.dto";
import UserService from "../services/user.service";
import HttpResponse from "../response/HttpResponse";

class UserController {
    private userService = new UserService()
    createAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: CreateAccountDto = req.body;
            const newAccount = await this.userService.createAccount(data)
            return res.status(200).send(new HttpResponse("success", "account created successfully", newAccount))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }
}

export default UserController