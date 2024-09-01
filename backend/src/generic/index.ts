import { Model, Document } from "mongoose";

export interface IRepository<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  updateById(id: string, data: Partial<T>): Promise<T | null>;
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  deleteById(id: string): Promise<boolean>;
}

export function createRepository<T extends Document>(
  model: Model<T>
): IRepository<T> {
  return {
    create(data: Partial<T>): Promise<T> {
      return model.create(data);
    },
    updateById(id: string, data: Partial<T>): Promise<T | null> {
      return model.findByIdAndUpdate(id, data, { new: true });
    },
    getById(id: string): Promise<T | null> {
      return model.findById(id);
    },
    getAll(): Promise<T[]> {
      return model.find();
    },
    async deleteById(id: string): Promise<boolean> {
      const result = await model.findByIdAndDelete(id);
      return result !== null;
    },
  };
}
