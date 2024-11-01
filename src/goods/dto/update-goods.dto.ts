import { PartialType } from '@nestjs/swagger';
import { CreateGoodsDto } from './create-goods.dto';

export class UpdateGoodsDto extends PartialType(CreateGoodsDto) { }
