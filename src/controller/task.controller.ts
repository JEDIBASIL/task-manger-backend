import { NextFunction, Request, Response } from "express";
import TaskService from "../services/task.service";
import { addCategoryDto, addPeopleDto, addTodoDto, deleteCategoryDto, deleteTodoDto } from "../dto/task.dto";
import HttpResponse from "../response/HttpResponse";
import IUser from "../interface/user.interface";
import { Document } from "mongoose";
import ITask from "../interface/task.interface";
import ICategory from "../interface/category.interface";

class TaskController {
    private service = new TaskService()
    getTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: IUser & Document = req["user"]
            const tasks = await this.service.getTask(user._id)
            return res.status(200).send(new HttpResponse("success", "", { tasks }))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }
    addTask = async (req: Request, res: Response, next: NextFunction) => {
        const newTask: addTodoDto = req.body
        const user: IUser & Document = req["user"]
        try {
            const task = await this.service.addTask(newTask, user._id)
            return res.status(200).send(new HttpResponse("success", "task added", { task }))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    addPeople = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newPeople: addPeopleDto = req.body
            const task: ITask = await this.service.addPeople(newPeople, user._id)
            return res.status(200).send(new HttpResponse("success", "people added", { task }))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    removePeople = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: IUser & Document = req["user"]
            const newPeople: addPeopleDto = req.body
            const task: ITask = await this.service.removePeople(newPeople, user._id)
            return res.status(200).send(new HttpResponse("success", "people removed", { task }))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    deleteTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const taskId: deleteTodoDto = req.body
            console.log(taskId)
            console.log(req.body)
            const user: IUser & Document = req["user"]
            const task: ITask = await this.service.deleteTask(taskId, user._id)
            return res.status(200).send(new HttpResponse("success", "task deleted"))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    addCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newCategory: addCategoryDto = req.body
            const user: IUser & Document = req["user"]
            const category: ICategory = await this.service.addCategory(newCategory, user._id)
            return res.status(200).send(new HttpResponse("success", "category added"))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    getCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryId: deleteCategoryDto = req.body
            const user: IUser & Document = req["user"]
            const categories = await this.service.getCategory(user._id)
            return res.status(200).send(new HttpResponse("success", "task categories", categories))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

}

export default TaskController