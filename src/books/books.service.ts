import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { v4 as uuidv4 } from "uuid";
import { JSONFilePreset } from "lowdb/node";
import { BookQueryDto } from "./dto/book-query.dto";
import { BaseLowdbService } from "src/common/services/base-lowdb.service";
import { Book } from "./interfaces/books.interface";

@Injectable()
export class BooksService extends BaseLowdbService<Book, BookQueryDto> {
  protected readonly collectionName = "books";
  protected readonly dbFile = process.env.DB_FILE || "/app/db.json";

  @HttpCode(HttpStatus.CREATED)
  async create(createBookDto: CreateBookDto) {
    const valitaedData = {
      id: uuidv4(),
      ...createBookDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const defaultData = { books: [] };
      const dbFile = process.env.DB_FILE || "/app/db.json";
      const db = await JSONFilePreset(dbFile, defaultData);

      db.data.books.push(valitaedData);
      await db.write();
    } catch (error: unknown) {
      const e = error as Error;
      console.error(e.message);
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
    return valitaedData;
  }

  async findAll(query: BookQueryDto) {
    return await this.find(query);
  }

  async findOne(id: string, query: BookQueryDto) {
    return (await this.find(query)).data.find((one) => one.id === id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  protected applySearch(books: Book[], searchTerm: string): Book[] {
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  protected applySort(books: Book[], sortOrder: "asc" | "desc"): Book[] {
    return books.sort((a, b) => {
      const authorA = a.author.toLowerCase();
      const authorB = b.author.toLowerCase();

      if (authorA < authorB) return sortOrder === "asc" ? -1 : 1;
      if (authorA > authorB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }
}
