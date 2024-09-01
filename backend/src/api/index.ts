import { Router } from "express";

import books from "./routes/books";

const router: Router = Router();

const routes: {
  [key: string]: (router: Router) => void;
} = {
  books,
};

for (const route in routes) {
  routes[route](router);
}

export { router };
