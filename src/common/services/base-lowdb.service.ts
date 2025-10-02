import { HttpException, HttpStatus } from "@nestjs/common";
import { JSONFilePreset } from "lowdb/node";
import { IQueryOptions } from "../interfaces/query-params.interface";

interface LowdbData<T> {
  [key: string]: T[];
}

export abstract class BaseLowdbService<T, Q extends IQueryOptions> {
  protected abstract readonly collectionName: string;
  protected abstract readonly dbFile: string;

  private getDbInstance() {
    const defaultData = { [this.collectionName]: [] } as LowdbData<T>;
    return JSONFilePreset<LowdbData<T>>(this.dbFile, defaultData);
  }

  protected abstract applySearch(items: T[], searchTerm: string): T[];
  protected abstract applySort(items: T[], sortOrder: "asc" | "desc"): T[];

  async find(query: Q): Promise<{
    data: T[];
    totalItems: number;
    currentPage: number;
    lastPage: number;
  }> {
    try {
      const db = await this.getDbInstance();
      let items: T[] = db.data[this.collectionName];

      if (query.search) {
        items = this.applySearch(items, query.search);
      }

      if (query.sort) {
        items = this.applySort(items, query.sort);
      }

      const page = query.page || 1;
      const limit = query.limit || 10;
      const startIndex = (page - 1) * limit;
      const paginatedItems = items.slice(startIndex, startIndex + limit);

      return {
        data: paginatedItems,
        totalItems: items.length,
        currentPage: page,
        lastPage: Math.ceil(items.length / limit),
      };
    } catch (error: unknown) {
      const e = error as Error;
      console.error(e.message);
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
  }
}
