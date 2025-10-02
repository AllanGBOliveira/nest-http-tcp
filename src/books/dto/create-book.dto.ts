import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateBookDto {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(512)
  @IsNotEmpty()
  description: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsNotEmpty()
  author: string;
}
