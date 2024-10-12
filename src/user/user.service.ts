import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { Repository, Like, FindOptionsWhere, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    // @InjectRepository(Tags) private readonly tag: Repository<Tags>
  ) { }

  
  getUser() {
    return 'hello world! this is get user'
  }
  async create(user: User) {

    const saltRounds = 10;
    const params: User = { account: user.account, password: await bcrypt.hash(user.password, saltRounds), username: user.account, role: '1' }
    console.log(params);
    // 创建新用户对象
    const newUser = this.userRepository.create(params);

    // 保存用户到数据库
    return await this.userRepository.save(newUser);


  }

  async findAll(query: { keyWord: string, page: number, pageSize: number }) {
    const { keyWord, page = 1, pageSize = 20 } = query;
    // 构建查询条件
    const whereCondition: FindOptionsWhere<User> = keyWord
      ? { account: Like(`%${keyWord}%`) } // 通过 name 字段模糊查询
      : ({} as FindOptionsWhere<User>); // 如果没有关键词，返回一个空对象并进行类型断言
    const records = await this.userRepository.find({
      //查询的时候如果需要联合查询需要增加 relations
      // relations:['tags'],
      where: whereCondition, // 添加查询条件
      order: {
        id: "DESC",
      },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    // console.log(records);

    const total = await this.userRepository.count({
      where: whereCondition, // 确保 total 与查询条件一致
    })
    return {
      records,
      total
    }
  }

  async findOneByAccount(account: string) {
    const whereCondition: FindOptionsWhere<User> = { account: account }; // 通过 account 字段精确匹配

    const user = await this.userRepository.findOne({
      where: whereCondition,
      order: {
        id: "DESC",
      },
    });

    if (!user)
      return null
    else
      return user; // 直接返回匹配的用户，若无匹配则返回 null

  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
