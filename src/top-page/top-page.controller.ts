import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import {
  PAGE_BY_CATEGORY_NOT_FOUND,
  PAGE_NOT_FOUND,
} from './top-page.constants';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  constructor(
    private readonly configService: ConfigService,
    private readonly topPageService: TopPageService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findPageById(id);
    if (!page) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }

    return page;
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedPage = await this.topPageService.deletePageById(id);
    if (!deletedPage) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }
  }

  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateTopPageDto,
  ) {
    const updatedPage = await this.topPageService.updatePageById(id, dto);
    if (!updatedPage) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }

    return updatedPage;
  }

  @HttpCode(200)
  @Post('findByCategory')
  async find(@Body() dto: FindTopPageDto) {
    const pages = await this.topPageService.findPageByCategory(dto);
    if (pages.length === 0) {
      throw new NotFoundException(PAGE_BY_CATEGORY_NOT_FOUND);
    }

    return pages;
  }
}
