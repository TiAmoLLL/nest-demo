import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserController } from './admin_user.controller';
import { AdminUserService } from './admin_user.service';

describe('AdminUserController', () => {
  let controller: AdminUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminUserController],
      providers: [AdminUserService],
    }).compile();

    controller = module.get<AdminUserController>(AdminUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
