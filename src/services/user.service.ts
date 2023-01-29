// login
// create account
// send mail verification
// change password

import { Document } from "mongoose";
import { CreateAccountDto, LoginDto, ResetPasswordDto } from "../dto/user.dto";
import HttpException from "../error/HttpException";
import IUser from "../interface/user.interface";
import userModel from "../model/user.model";

class UserService {
    private model = userModel;

    async findByEmail(email: string): Promise<IUser & Document | null> {
        return await this.model.findOne({ email })
    }
    async findByUsername(username: string): Promise<IUser & Document | null> {
        return await this.model.findOne({ username })
    }

    async createAccount(newUser: CreateAccountDto): Promise<CreateAccountDto> {
        if (await this.findByUsername(newUser.username)) throw new HttpException(409, "username taken")
        if (await this.findByEmail(newUser.email)) throw new HttpException(409, "email taken")
        const newAccount = await this.model.create({ ...newUser })
        return newAccount;
    }

    async verify(email: string): Promise<Boolean> {
        const account = await this.findByEmail(email)
        if (!account) throw new HttpException(400, "invalid token")
        if (account.isVerified) throw new HttpException(200, "user is already verified")
        account.isVerified = true;
        account.save();
        return true;
    }

   
}

export default UserService