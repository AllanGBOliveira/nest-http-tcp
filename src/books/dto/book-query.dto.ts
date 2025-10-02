import { PaginationDto } from "../../common/dto/pagination.dto";
import { IsOptional, IsString } from "class-validator";

export class BookQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  author?: string;
}
