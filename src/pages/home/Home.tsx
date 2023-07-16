/* eslint-disable @typescript-eslint/no-unsafe-call */

import { useGetLatestBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../globalTypes/globalTypes";
import Loading from "../shared/Loading";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, error, isLoading } = useGetLatestBooksQuery(undefined);
  const navigate = useNavigate();
  let body = null;
  if (isLoading) {
    body = <Loading />;
  }
  if (!isLoading && !error && data) {
    body = (
      <>
        <div className="overflow-x-auto pt-5">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Publication Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((book: IBook, i: string) => (
                <tr>
                  <th>{i + 1}</th>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.publicationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <div className="container mx-auto pb-10">
      <p className="text-center text-2xl">Latest Books</p>
      {body}
      <div className="text-center py-10">
        <button
          onClick={() => navigate("/books")}
          className="btn btn-active btn-neutral btn-wide"
        >
          All Books
        </button>
      </div>
    </div>
  );
};

export default Home;
