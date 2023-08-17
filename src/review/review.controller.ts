import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';
import { REVIEW_NOT_CREATED, REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {
    const review = await this.reviewService.create(dto);
    if (!review) {
      throw new HttpException(
        REVIEW_NOT_CREATED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return review;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId') productId: string,
    @UserEmail() email: string,
  ) {
    return this.reviewService.findByProductId(productId);
  }

  @Delete('byProduct/:productId')
  async deleteAllByProduct(@Param('productId') productId: string) {
    const result = await this.reviewService.deleteAllByProductId(productId);
    if (result.deletedCount === 0) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
