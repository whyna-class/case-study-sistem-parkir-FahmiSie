import { Module } from '@nestjs/common';
import { ParkirController } from './parkir.controller';
import { ParkirService } from './parkir.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ParkirController],
  providers: [ParkirService, PrismaService],
})
export class ParkirModule {}  
