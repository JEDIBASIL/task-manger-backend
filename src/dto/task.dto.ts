import { Schema } from "mongoose";

interface AddTodoDto {
    name: string;
    starts: Date;
    ends: Date;
    people?: [];
    category: string;
    description: string;
}

interface UpdateTodoDto {
    name: string;
    category: string | Schema.Types.ObjectId;
    description: string;
}

interface DeleteTodoDto {
    id: string
}

interface AddCategoryDto {
    name: string
}

interface DeleteCategoryDto {
    id: string
}


interface AddPeopleDto {
    people: string[];
    taskId: string
}


export { AddTodoDto, DeleteTodoDto, AddPeopleDto, AddCategoryDto, DeleteCategoryDto, UpdateTodoDto }