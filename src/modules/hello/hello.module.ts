import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { HelloEntity } from './hello.entity';
import { HelloService } from './hello.service';
import { HelloController } from './hello.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HelloEntity]), HttpModule],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
