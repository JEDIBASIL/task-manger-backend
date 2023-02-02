import { Document } from "mongoose";
import { addCategoryDto, addPeopleDto, addTodoDto, deleteTodoDto } from "../dto/task.dto";
import HttpException from "../error/HttpException";
import ITask from "../interface/task.interface";
import taskModel from "../model/task.model"
import logger from "../utils/logger";
import categoryModel from "../model/category.model";
import ICategory from "../interface/category.interface";
// addTask
// update task
// delete task
// add people
// remove people
// add comment
// delete comment
// 

class TaskService {
    private tModel = taskModel;
    private cModel = categoryModel;

    async addTask(newTodo: addTodoDto, userId: string): Promise<ITask> {
        const task = await this.tModel.create({ ...newTodo, user: userId })
        return task
    }
    async getTask(userId: string): Promise<ITask[]> {
        return await this.tModel.find({ user: userId }).populate("category")
    }
    async addPeople(newPeople: addPeopleDto, userId: string): Promise<ITask> {
        const task = await await this.isAllowed(newPeople.taskId, userId)
        if (!task) throw new HttpException(404, "task not found")
        newPeople.people.forEach(el => {
            if (!task.people.includes(el)) task.people.push(el)
        });
        task.save()
        return task
    }
    async removePeople(newPeople: addPeopleDto, userId: string): Promise<ITask> {
        const task = await await this.isAllowed(newPeople.taskId, userId)
        if (!task) throw new HttpException(404, "task not found")
        const a = task.people.map(objectId => objectId.toString())
        const b = newPeople.people
        const result = a.filter(item => b.indexOf(item) === -1);
        task.people = [...result]
        task.save()
        return task
    }

    async isAllowed(taskId: string, userId: string): Promise<ITask & Document> {
        const task = await this.tModel.findOne({ _id: taskId, user: userId })
        if (!task) throw new HttpException(404, "task not found")
        return task
    }

    async deleteTask(taskId: deleteTodoDto, userId: string): Promise<ITask> {
        const { id } = taskId
        const task = await this.isAllowed(id, userId)
        task.delete()
        return task as ITask
    }

    async addCategory({ name }: addCategoryDto, userId: string): Promise<ICategory> {
        const category = this.cModel.create({ name, user: userId })
        return category
    }

    async getCategory(userId: string): Promise<ICategory[]> {
        return this.cModel.find({ user: userId })
    }
}

export default TaskService