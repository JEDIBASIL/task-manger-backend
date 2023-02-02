import { NextFunction, Request, Response } from "express";
import TaskService from "../services/task.service";
import { AddCategoryDto, AddPeopleDto, AddTodoDto, DeleteCategoryDto, UpdateTodoDto } from "../dto/task.dto";
import HttpResponse from "../response/HttpResponse";
import IUser from "../interface/user.interface";
import { Document } from "mongoose";
import ITask from "../interface/task.interface";
import ICategory from "../interface/category.interface";

class TaskController {
    private service = new TaskService()
    getTasks = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const user: IUser & Document = req["user"]
            const tasks = await this.service.getTasks(user._id)
            return res.status(200).send(new HttpResponse("success", "", { tasks }))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }
    getTask = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const user: IUser & Document = req["user"]
            const { id } = req.params
            console.log(req.params)
            const task = await this.service.getTask(user._id, id)
            return res.status(200).send(new HttpResponse("success", "", task))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }
    addTask = async (req: Request | any, res: Response, next: NextFunction) => {
        const newTask: AddTodoDto = req.body
        const user: IUser & Document = req["user"]
        try {
            const task = await this.service.addTask(newTask, user._id)
            return res.status(200).send(new HttpResponse("success", "task added", { task }))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    addPeople = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const newPeople: AddPeopleDto = req.body
            const user: IUser & Document = req["user"]
            const task: ITask = await this.service.addPeople(newPeople, user._id)
            return res.status(200).send(new HttpResponse("success", "people added", { task }))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    removePeople = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const user: IUser & Document = req["user"]
            const newPeople: AddPeopleDto = req.body
            const task: ITask = await this.service.removePeople(newPeople, user._id)
            console.log(task)
            return res.status(200).send(new HttpResponse("success", "people removed", { task }))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    updateTask = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const updates: UpdateTodoDto = req.body
            const { id } = req.params
            const user: IUser & Document = req["user"]
            const task: ITask = await this.service.updateTask(updates, id, user._id)
            return res.status(200).send(new HttpResponse("success", "task update", task))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    deleteTask = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const user: IUser & Document = req["user"]
            const task: ITask = await this.service.deleteTask({ id }, user._id)
            return res.status(200).send(new HttpResponse("success", "task deleted"))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    addCategory = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const newCategory: AddCategoryDto = req.body
            const user: IUser & Document = req["user"]
            const category: ICategory = await this.service.addCategory(newCategory, user._id)
            return res.status(200).send(new HttpResponse("success", "category added", category))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    getCategory = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const categoryId: DeleteCategoryDto = req.body
            const user: IUser & Document = req["user"]
            const categories = await this.service.getCategory(user._id)
            return res.status(200).send(new HttpResponse("success", "task categories", categories))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

}

export default TaskController