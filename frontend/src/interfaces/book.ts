export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  year: number;
}

export interface Book extends IBook {}
