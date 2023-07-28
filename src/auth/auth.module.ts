import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthModel, AuthSchema } from './auth.model';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthModel.name,
        schema: AuthSchema,
      },
    ]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
