import { Router } from "express";
import UserController from "../controller/user.controller";
import { dtoValidationMiddleware } from "../middleware/dto.validator.middleware";
import { createAccountSchema } from "../validator/validator.schema";
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
    }

}

export default UserRoute