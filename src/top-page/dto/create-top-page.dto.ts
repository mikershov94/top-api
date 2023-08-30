import {
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { HhData, TopLevelCategory, TopPageAdvantage } from '../top-page.model';
import { Type } from 'class-transformer';

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HhData)
  hh?: HhData;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantage)
  advantages: TopPageAdvantage[];

  @IsString()
  seoText: string;

  @IsString()
  tagTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
