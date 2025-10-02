import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsIn,
} from "class-validator";
import { Type } from "class-transformer";
import { IQueryOptions } from "../interfaces/query-params.interface";

export class PaginationDto implements IQueryOptions {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  sort?: "asc" | "desc";
}
