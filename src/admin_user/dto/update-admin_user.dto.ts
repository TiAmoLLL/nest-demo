import { IsNumber, IsString, IsNotEmpty, Length, Min, Max } from 'class-validator';
import { CreateAdminUserDto } from './create-admin_user.dto';
export class UpdateAdminUserDto extends CreateAdminUserDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(99999999999)
    id: number;

    // @IsString()
    // @IsNotEmpty()
    // @Length(1, 20)
    // account: string;

    // @IsString()
    // @IsNotEmpty()
    // @Length(6, 20)
    // password: string;

    // @IsString()
    // @IsNotEmpty()
    // @Length(1, 20)
    // username: string;

    // @IsString()
    // @IsNotEmpty()
    // @Length(1, 20)
    // role: string;


}

