import React from "react";
import { Navigate } from "react-router-dom";
import Books from "../pages/books/books";
import Home from "../pages/home/home";
import { CreateBookForm } from "../pages/books/createBook";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/books" replace />,
  },
  {
    path: "/home",
    element: (
      <React.Fragment>
        <Home/>
      </React.Fragment>
    ),
  },
  {
    path: "/books",
    element: (
      <React.Fragment>
        <Books/>
      </React.Fragment>
    ),
  },
  {
    path: "/createBook",
    element: (
      <React.Fragment>
        <CreateBookForm />
      </React.Fragment>
    ),
  },
  {
    path: "/editBook/:id",
    element: (
      <React.Fragment>
        <CreateBookForm />
      </React.Fragment>
    ),
  },
];
