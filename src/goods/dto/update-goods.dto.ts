import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { CreateGoodsDto } from './create-goods.dto';

export class UpdateGoodsDto extends PartialType(CreateGoodsDto) {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(99999999999)
    goods_id: number;
}
