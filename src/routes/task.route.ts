import { Router } from "express";
import IRoute from "../interface/route.interface";
import TaskController from "../controller/task.controller";
import UserAuth from "../auth/user.auth";

class TaskRoute implements IRoute {
    public path = "/task";
    public route = Router();
    private controller = new TaskController();

    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.route.get(
            `${this.path}`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.getTasks
        )
        this.route.post(
            `${this.path}`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.addTask
        )

        this.route.get(
            `${this.path}/category`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.getCategory
        )
        
        this.route.get(
            `${this.path}/:id`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.getTask
        )
        this.route.post(
            `${this.path}/people`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.addPeople
        )
        this.route.put(
            `${this.path}/:id`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.updateTask
        )
        this.route.delete(
            `${this.path}/people`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.removePeople
        )
        
        this.route.delete(
            `${this.path}/:id`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.deleteTask
        )

        
        this.route.post(
            `${this.path}/category`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.addCategory
        )
       
    }

}

export default TaskRoute