interface IUser{
    name:string;
    username:string;
    email:string;
    password:string;
    joinedAt:Date;
    isVerified:boolean;
    isPasswordMatch:(password:string) => boolean 
}

export default IUser