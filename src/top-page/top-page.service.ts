import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopPageDocument, TopPageModel } from './top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private topPageModel: Model<TopPageDocument>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async findPageById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async deletePageById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updatePageById(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findPageByCategory(dto: FindTopPageDto) {
    return this.topPageModel.aggregate([
      {
        $match: {
          firstCategory: dto.firstCategory,
        },
      },
    ]);
  }
}
