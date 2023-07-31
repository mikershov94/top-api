import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewDocument, ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  // организуем методы по CRUD для работы с БД

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<ReviewModel | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewModel[]> {
    return this.reviewModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();
  }

  async deleteAllByProductId(
    productId: string,
  ): Promise<{ deletedCount: number }> {
    return this.reviewModel
      .deleteMany({ productId: new Types.ObjectId(productId) })
      .exec();
  }
}
