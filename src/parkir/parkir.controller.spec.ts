import { Test, TestingModule } from '@nestjs/testing';
import { ParkirController } from './parkir.controller';

describe('ParkirController', () => {
  let controller: ParkirController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkirController],
    }).compile();

    controller = module.get<ParkirController>(ParkirController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
