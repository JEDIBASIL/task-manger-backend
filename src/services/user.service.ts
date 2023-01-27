// login
// create account
// send mail verification
// change password

import { CreateAccountDto } from "../dto/user.dto";
import HttpException from "../error/HttpException";
import userModel from "../model/user.model";

class UserService{
    private model = userModel;

    async createAccount(newUser: CreateAccountDto): Promise<CreateAccountDto> {
        const searchedEmail = await this.model.findOne({ email: newUser.email })
        const searchedUsername = await this.model.findOne({ username: newUser.username })
        if (searchedUsername) throw new HttpException(409, "username taken")
        if (searchedEmail) throw new HttpException(409, "email taken")
        const newAccount = await this.model.create({ ...newUser })
        return newAccount;
    }
}

export default UserService