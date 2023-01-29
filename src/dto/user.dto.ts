
interface CreateAccountDto {
  username: string;
  password: string;
  email: string;
}

interface VerifyAccountDto {
  token: string;
}

interface LoginDto {
  password: string;
  email: string;
}


interface ResetPasswordDto {
  token: string;
  oldPassword: string;
  newPassword: string;
}

export { CreateAccountDto, VerifyAccountDto, LoginDto, ResetPasswordDto }