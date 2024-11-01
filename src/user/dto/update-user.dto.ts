import { IsNumber, IsString, IsNotEmpty, Length, Min, Max } from 'class-validator';
export class UpdateUserDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(99999999999)
    id: number;

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

