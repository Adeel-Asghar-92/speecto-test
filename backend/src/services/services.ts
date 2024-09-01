// service.ts
import { Document } from "mongoose";
import { IRepository } from "../generic";

export interface IService<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  updateById(id: string, data: Partial<T>): Promise<T | null>;
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  deleteById(id: string): Promise<boolean>;
}

export function createService<T extends Document>(
  repository: IRepository<T>
): IService<T> {
  return {
    async create(data: Partial<T>): Promise<T> {
      return await repository.create(data);
    },
    async updateById(id: string, data: Partial<T>): Promise<T | null> {
      return await repository.updateById(id, data);
    },
    async getById(id: string): Promise<T | null> {
      return await repository.getById(id);
    },
    async getAll(): Promise<T[]> {
      return await repository.getAll();
    },
    async deleteById(id: string): Promise<boolean> {
      return await repository.deleteById(id);
    },
  };
}
