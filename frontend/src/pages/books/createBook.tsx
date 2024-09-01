import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createBookService,
  getBooksByIdService,
  getBooksService,
  updateBookService,
} from "../../services/bookService";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/loader";

const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  year: z.number().int().min(1900).max(2024),
});

export type BookFormInputs = z.infer<typeof bookSchema>;

export const CreateBookForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormInputs>({
    resolver: zodResolver(bookSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { id } = useParams<{ id: string }>();
  const onSubmitHandler = async (data: BookFormInputs) => {
    setLoading(true);
    if (id) await dispatch(updateBookService({ ...data, _id: id }) as any);
    else await dispatch(createBookService(data) as any);
    setLoading(false);
    navigate("/books");
  };

  //   Handle for Editing
  useEffect(() => {
    if (id) {
      dispatch(getBooksByIdService(id) as any)
        .unwrap()
        .then((data: any) => {
          reset(data);
        })
        .catch((e: any) => {
          console.log(e);
        });
    }
  }, [id]);
  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <div className="flex flex-col  shadow-md rounded p-6 m-10    bg-white">
      <form onSubmit={handleSubmit(onSubmitHandler, onError)} className="">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold text-center">Create Book</h2>
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-md"
          >
            Go back
          </button>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Title:
          </label>
          <input
            type="text"
            {...register("title")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
        </div>
        <div className="mb-5">
          Author:
          <input
            type="text"
            {...register("author")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.author && (
            <div className="text-red-500">{errors.author.message}</div>
          )}
        </div>
        <div className="mb-5">
          Genre:
          <input
            type="text"
            {...register("genre")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.genre && (
            <div className="text-red-500">{errors.genre.message}</div>
          )}
        </div>
        <div className="mb-5">
          Year:
          <input
            type="number"
            {...register("year", { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.year && (
            <div className="text-red-500">{errors.year.message}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white font-bold rounded-md"
          disabled={loading}
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      </form>
    </div>
  );
};
