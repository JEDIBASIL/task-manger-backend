import { Router } from "express";
import UserController from "../controller/user.controller";
import { dtoValidationMiddleware } from "../middleware/dto.validator.middleware";
import { createAccountSchema, verifyAccountSchema } from "../validator/validator.schema";
import IRoute from "../interface/route.interface";

class UserRoute implements IRoute {
    public path = "/user";
    public route = Router();
    private controller = new UserController();

    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.route.post(
            `${this.path}/create`,
            dtoValidationMiddleware(createAccountSchema, "body"),
            this.controller.createAccount
        )
        this.route.post(
            `${this.path}/verify`,
            dtoValidationMiddleware(verifyAccountSchema, "body"),
            this.controller.verify
        )
        this.route.post(
            `${this.path}/resend-mail`,
            this.controller.resendVerificationMail
        )
        this.route.post(
            `${this.path}/password-mail`,
            this.controller.sendResetPasswordMail
        )
        this.route.post(
            `${this.path}/login`,
            this.controller.login
        )
        
        this.route.post(
            `${this.path}/reset-password`,
            this.controller.resetPassword
        )
    }

}

export default UserRoute