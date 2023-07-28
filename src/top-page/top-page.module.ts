import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageController } from './top-page.controller';
import { TopPageModel, TopPageSchema } from './top-page.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: TopPageModel.name,
        schema: TopPageSchema,
      },
    ]),
  ],
  controllers: [TopPageController],
})
export class TopPageModule {}
