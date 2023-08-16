import { Types } from 'mongoose';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Max(5)
  @Min(1, { message: 'Рейтинг не может быть более 1' })
  rating: number;

  @IsString()
  productId: Types.ObjectId;
}
