import { IsNotEmpty, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateBookDto } from "./create-book.dto";

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsString()
  @IsNotEmpty()
  id: string;

  title?: string;
  description?: string;
  author?: string;
}
