import { Type } from 'class-transformer';
import { IsString, IsNumber, IsEmail, IsNotEmpty, Length, ValidateNested, IsArray } from 'class-validator';
class ImageObject {
    @IsString()
    @IsNotEmpty()
    fileName: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsNumber()
    size: number;
}
export class CreateGoodsDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    goods_name: string;

    @IsNumber()
    @IsNotEmpty()
    @Length(0, 99999999)
    goods_price: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    goods_description: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageObject) // 必须使用 Type 来指明具体的类型
    goods_image?: ImageObject[];

    @IsNumber()
    @IsNotEmpty()
    @Length(0, 99999999)
    goods_quantity: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    goods_category: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    goods_status: string;
}
