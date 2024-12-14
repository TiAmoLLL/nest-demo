import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateAdminUserDto } from './dto/create-admin_user.dto';
import { UpdateAdminUserDto } from './dto/update-admin_user.dto';

import { AdminUser } from './entities/admin_user.entity';
import { Repository, Like, FindOptionsWhere, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnType } from '../types/return-type.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminUserService {

  constructor(
    @InjectRepository(AdminUser) private readonly userRepository: Repository<AdminUser>,
  ) { }

  // 登录验证
  async findOneByAccount(account: string) {
    const whereCondition: FindOptionsWhere<AdminUser> = { account: account }; // 通过 account 字段精确匹配

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

  // 用户管理
  async create(user: CreateAdminUserDto): Promise<ReturnType> {
    console.log(user);

    const saltRounds = 10;
    const params: AdminUser = new AdminUser(user.account, await bcrypt.hash(user.password, saltRounds), user.username, user.role);
    console.log(params);
    // 检查账号是否已经存在
    const existingUser = await this.userRepository.findOne({
      where: { account: user.account }
    });

    if (existingUser) {
      console.error('账号已存在:', user.account);
      return {
        code: 500,
        message: '用户已存在',
        success: false,
        data: "用户已存在"
      }
    }
    // 创建新用户对象
    const newUser = this.userRepository.create(params);

    // 保存用户到数据库
    // 保存用户到数据库并返回结果
    try {
      const savedUser = await this.userRepository.save(newUser);
      console.log('用户保存成功:', savedUser);
      return {
        code: 200,
        message: '用户保存成功',
        success: true,
        data: "用户保存成功"
      } // 返回保存后的用户数据
    } catch (error) {
      console.error('保存用户失败:', error);
      return {
        code: 500,
        message: '保存用户失败',
        success: false,
        data: "保存用户失败"
      }
    }


  }
  async remove(id: number): Promise<ReturnType> {
    // 检查用户是否存在
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException({
        code: 404,
        message: '用户不存在',
        success: false,
        data: "用户不存在",
      }, HttpStatus.NOT_FOUND); // 返回 404 状态码
    }
    try {
      // 删除用户
      const deleteUser = await this.userRepository.remove(user);
      console.log('删除用户成功:', deleteUser);
      return {
        code: 200,
        message: 'success',
        success: true,
        data: "删除用户成功"
      } // 返回保存后的用户数据
    } catch (error) {
      console.error('删除用户失败:', error);
      return {
        code: 500,
        message: 'error',
        success: false,
        data: "删除用户失败"
      }
    }
  }
  async findAll(query: { account: string; page: number; pageSize: number }): Promise<ReturnType> {
    const { account, page = 1, pageSize = 20 } = query;

    const usersQuery = this.userRepository.createQueryBuilder('user');

    if (account) {
      usersQuery.where('(user.account LIKE :account OR user.username LIKE :account)', {
        account: `%${account}%`,
      });
    }

    const records = await usersQuery
      .orderBy('user.id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    const safeRecords = records.map(({ password, ...rest }) => rest);

    const total = await usersQuery.getCount(); // 使用相同的查询条件

    return {
      code: 200,
      message: 'success',
      success: true,
      data: {
        records: safeRecords,
        total,
      }
    }
  }





  async update(user: UpdateAdminUserDto): Promise<ReturnType> {
    // Step 1: 查找用户
    const userInfo = await this.userRepository.findOne({ where: { id: user.id } });
    if (!userInfo) {
      console.error('账号不存在:', user.account);
      return {
        code: 500,
        message: '用户已存在',
        success: false,
        data: "用户已存在"
      }
    }
    // Step 2: 如果传入了新的密码，进行加密
    if (user.password) {
      const saltRounds = 10;
      // 对密码进行加密
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
    // Step 2: 更新用户信息
    // 使用 `Object.assign` 方法将 `updateUserDto` 中的新数据赋值给 `user` 实例
    // Step 2: 更新用户信息
    // 使用 `Object.assign` 方法将新数据赋值给 `existingUser`
    // TODO:密码未加密
    Object.assign(userInfo, user); // 将传入的用户数据合并到现有用户中

    // Step 3: 保存更新后的用户信息
    try {

      const updatedUser = await this.userRepository.save(userInfo);
      return {
        code: 200,
        message: '用户更新成功',
        success: true,
        data: updatedUser,
      };
    } catch (error) {
      console.error('用户更新失败:', error);
      return {
        code: 500,
        message: '用户更新失败',
        success: false,
        data: '用户更新失败',
      };
    }
  }


}
