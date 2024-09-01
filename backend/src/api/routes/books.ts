import { Router } from "express";

import { bookValidation } from "../../validations/bookValidation";
import { bookController } from "../../controllers/bookController";

const book = (router: Router): void => {
  router.post(
    "/book/create",
    bookValidation.validateCreate,
    bookController.create
  );
  router.post(
    "/book/updateById",
    bookValidation.validateUpdateById,
    bookController.updateById
  );
  router.delete(
    "/book/deleteById/:id",
    bookValidation.validateDeleteById,
    bookController.deleteById
  );
  router.get("/book/get", bookController.getAll);
  router.post("/book/getById", bookController.getById);
};

export default book;
