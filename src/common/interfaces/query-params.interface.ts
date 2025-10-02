import { PaginationDto } from "../dto/pagination.dto";

export interface IQueryOptions extends PaginationDto {
  search?: string;
  sort?: "asc" | "desc";
}
