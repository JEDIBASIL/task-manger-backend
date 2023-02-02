interface addTodoDto {
    name: string;
    starts: Date;
    ends: Date;
    people: []
    category: string
}

interface deleteTodoDto {
    id: string
}

interface addCategoryDto {
    name: string
}

interface deleteCategoryDto {
    id: string
}


interface addPeopleDto {
    people: string[];
    taskId: string
}


export { addTodoDto, deleteTodoDto, addPeopleDto, addCategoryDto, deleteCategoryDto }