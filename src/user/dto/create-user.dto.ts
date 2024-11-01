import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    account: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    role: string;


}
