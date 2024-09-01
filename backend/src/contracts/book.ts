import { Document, Model } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  year: number;
}
