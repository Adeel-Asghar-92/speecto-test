import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookService, getBooksService } from "../../services/bookService";
import { IBook } from "../../interfaces/book";
import { RootState } from "../../redux/types/root";
import { Loader } from "../../components/Loader/loader";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const dispatch = useDispatch();
  const books: IBook[] = useSelector((state: RootState) => state.book);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const initFetch = useCallback(async () => {
    setLoading(true);
    await dispatch(getBooksService() as any);
    setLoading(false);
  }, [dispatch]);

  const deleteBook = async (book: IBook) => {
    await dispatch(deleteBookService(book._id!) as any);
    initFetch();
  };

  useEffect(() => {
    initFetch();
  }, [initFetch]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col shadow-lg rounded-lg p-6 m-4 bg-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-4xl font-bold">Books</h1>
        <button
          className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-md"
          onClick={() => navigate("/createBook")}
        >
          Add book
        </button>
      </div>
      <div className="mb-4">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700"
        >
          Search
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Genre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Year
                      </th>

                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBooks.map((book) => (
                      <tr key={book._id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {book.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {book.author}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {book.genre}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {book.year}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button
                            onClick={() => deleteBook(book)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                          |
                          <button
                            onClick={() => navigate(`/updateBook/${book._id}`)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Books;
