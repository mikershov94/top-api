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
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { PAGE_NOT_FOUND } from './top-page.constants';

@Controller('top-page')
export class TopPageController {
  constructor(
    private readonly configService: ConfigService,
    private readonly topPageService: TopPageService,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const page = await this.topPageService.findPageById(id);
    if (!page) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }

    return page;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedPage = await this.topPageService.deletePageById(id);
    if (!deletedPage) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }
  }

  // @Patch(':id')
  // async patch(@Param('id') id: string, @Body() dto: TopPageModel) {}

  // @HttpCode(200)
  // @Post()
  // async find(@Body() dto: FindTopPageDto) {}
}
