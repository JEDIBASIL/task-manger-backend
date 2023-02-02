import { JSONSchemaType } from "ajv";
import { CreateAccountDto, VerifyAccountDto } from "../dto/user.dto";
import { AddTodoDto, UpdateTodoDto } from "../dto/task.dto";


const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const createAccountSchema: JSONSchemaType<CreateAccountDto> = {
    type: 'object',
    properties: {
        username: { type: 'string', minLength: 3 },
        password: { type: 'string', minLength: 6, },
        email: { type: 'string', pattern: emailRegex.source },
    },
    required: ['username', 'password', 'email']
};

const verifyAccountSchema: JSONSchemaType<VerifyAccountDto> = {
    type: 'object',
    properties: {
        token: { type: 'string', },
    },
    required: ['token']
};

const updateTaskSchema: JSONSchemaType<UpdateTodoDto> = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 3 },
        category: { type: 'string', minLength: 6, },
        description: { type: 'string', pattern: emailRegex.source },
    },
    required: ['name', 'category', 'description']
};




export { createAccountSchema, verifyAccountSchema,updateTaskSchema }