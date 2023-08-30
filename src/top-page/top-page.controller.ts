import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';

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

  // @Get(':id')
  // async get(@Param('id') id: string) {
  //   this.configService.get('TEST');
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {}

  // @Patch(':id')
  // async patch(@Param('id') id: string, @Body() dto: TopPageModel) {}

  // @HttpCode(200)
  // @Post()
  // async find(@Body() dto: FindTopPageDto) {}
}
