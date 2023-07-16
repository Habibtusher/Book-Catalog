import { useNavigate } from "react-router-dom";
import { IBook } from "../../globalTypes/globalTypes";
import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import Loading from "../shared/Loading";
import { useState } from "react";
const Books = () => {

  const [searchValue, setSearchValue] = useState<string | null>("");
  const [publicationYear, setPublicationYear] = useState<string | null>("");

  const [genre, setGenre] = useState<string | null>("");
  const navigate = useNavigate();
  interface IFilter {
    page: number;
    limit?: number;
    searchTerm?: string | null;
    publicationYear?: string | null;
    genre?: string | null;
  }
  const filter: IFilter = {
    page: 1,
    limit: 100,
    searchTerm: searchValue,
    publicationYear: publicationYear,
    genre: genre,
  };

  const { data, error, isLoading } = useGetBooksQuery({ filter },{pollingInterval:30000,refetchOnFocus:true});
  const handleBookDetails = (id: string) => {
    navigate(`/book/details/${id}`);
  };
  let body = null;
  if (isLoading) {
    body = <Loading />;
  }
  if (!isLoading && !error && data) {
    body = (
      <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 sm:justify-items-center gap-4">
        {data?.data.map((book: IBook) => (
          <div
            onClick={() => handleBookDetails(book._id)}
            key={book._id}
            className="card w-72 bg-base-100 shadow-xl cursor-pointer"
          >
            <figure className="px-5 pt-5">
              <img
                src="https://i.ibb.co/bN1GKhL/Untitled.png"
                alt="cover"
                className="rounded-xl h-60"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book?.title}</h2>
              <p className="font-normal">By {book.author}</p>
              <p className="font-normal text-gray-500">{book.genre}</p>
              <p className="font-light text-gray-400">
                Published on: {book.publicationDate}
              </p>
              {/* <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      // <div className="overflow-x-auto">
      //   <table className="table">
      //     {/* head */}
      //     <thead>
      //       <tr>
      //         <th>Title</th>
      //         <th>Author</th>
      //         <th>Genre</th>
      //         <th>Publication Date</th>
      //         <th></th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {data?.data.map((book: IBook) => (
      //         <tr>
      //           <td>
      //             <div className="flex items-center space-x-3">
      //               <div>
      //                 <div className="font-bold">{book.title}</div>
      //                 {/* <div className="text-sm opacity-50">United States</div> */}
      //               </div>
      //             </div>
      //           </td>
      //           <td>{book.author}</td>
      //           <td>{book.genre}</td>
      //           <td>{book.publicationDate}</td>
      //           <th>
      //             <button className="btn btn-ghost btn-xs">details</button>
      //           </th>
      //         </tr>
      //       ))}
      //     </tbody>
      //   </table>
      //   <div className="text-center pt-5">
      //     <div className="join ">
      //       <button className="join-item btn">1</button>
      //       <button className="join-item btn">2</button>
      //       <button className="join-item btn">3</button>
      //       <button className="join-item btn">4</button>
      //     </div>
      //   </div>
      // </div>
    );
  }
  const years = [
    { value: 1980, title: 1980 },
    { value: 1981, title: 1981 },
    { value: 1982, title: 1982 },
    { value: 1983, title: 1983 },
    { value: 1984, title: 1984 },
    { value: 1985, title: 1985 },
    { value: 1986, title: 1986 },
    { value: 1987, title: 1987 },
    { value: 1988, title: 1988 },
    { value: 1989, title: 1989 },
    { value: 1990, title: 1990 },
    { value: 1991, title: 1991 },
    { value: 1992, title: 1992 },
    { value: 1993, title: 1993 },
    { value: 1994, title: 1994 },
    { value: 1995, title: 1995 },
    { value: 1996, title: 1996 },
    { value: 1997, title: 1997 },
    { value: 1998, title: 1998 },
    { value: 1999, title: 1999 },
    { value: 2000, title: 2000 },
    { value: 2001, title: 2001 },
    { value: 2002, title: 2002 },
    { value: 2003, title: 2003 },
    { value: 2004, title: 2004 },
    { value: 2005, title: 2005 },
    { value: 2006, title: 2006 },
    { value: 2007, title: 2007 },
    { value: 2008, title: 2008 },
    { value: 2009, title: 2009 },
    { value: 2010, title: 2010 },
    { value: 2011, title: 2011 },
    { value: 2012, title: 2012 },
    { value: 2013, title: 2013 },
    { value: 2014, title: 2014 },
    { value: 2015, title: 2015 },
    { value: 2016, title: 2016 },
    { value: 2017, title: 2017 },
    { value: 2018, title: 2018 },
    { value: 2019, title: 2019 },
    { value: 2020, title: 2020 },
    { value: 2021, title: 2021 },
    { value: 2022, title: 2022 },
    { value: 2023, title: 2023 },
    { value: 2024, title: 2024 },
    { value: 2025, title: 2025 },
    { value: 2026, title: 2026 },
    { value: 2027, title: 2027 },
    { value: 2028, title: 2028 },
    { value: 2029, title: 2029 },
    { value: 2030, title: 2030 },
    { value: 2031, title: 2031 },
    { value: 2032, title: 2032 },
    { value: 2033, title: 2033 },
    { value: 2034, title: 2034 },
    { value: 2035, title: 2035 },
    { value: 2036, title: 2036 },
    { value: 2037, title: 2037 },
    { value: 2038, title: 2038 },
    { value: 2039, title: 2039 },
    { value: 2040, title: 2040 },
  ];
  const genres = [
    { value: "Fiction", title: "Fiction" },
    { value: "Mystery", title: "Mystery" },
    { value: "Thriller", title: "Thriller" },
    { value: "Romance", title: "Romance" },
    { value: "Science Fiction", title: "Science Fiction" },
    { value: "Fantasy", title: "Fantasy" },
    { value: "Historical Fiction", title: "Historical Fiction" },
    { value: "Horror", title: "Horror" },
    { value: "Biography", title: "Biography" },
    { value: "Autobiography", title: "Autobiography" },
    { value: "Memoir", title: "Memoir" },
    { value: "Self-help", title: "Self-help" },
    { value: "Young Adult", title: "Young Adult" },
    { value: "Children's Books", title: "Children's Books" },
    { value: "Poetry", title: "Poetry" },
    { value: "Drama", title: "Drama" },
    { value: "Crime", title: "Crime" },
    { value: "Adventure", title: "Adventure" },
    { value: "Comedy", title: "Comedy" },
    { value: "Nonfiction", title: "Nonfiction" },
  ];
  return (
    <div className="container mx-auto pb-10">
      <div className="flex justify-between pb-5">
        <p className=" text-2xl">All Books</p>
        <div className="flex gap-3">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search by title, author, genre"
            className="input input-bordered input-sm "
          />
          <select
            value={genre as string}
            onChange={(e) => setGenre(e.target.value)}
            className="select select-bordered select-sm w-full max-w-xs"
          >
            <option disabled value="">
              Filter by genre
            </option>
            {genres?.map((genre) => (
              <option value={genre.value}>{genre.title}</option>
            ))}
          </select>
          <select
            //   defaultValue={publicationYearD as string}
            value={publicationYear as string}
            onChange={(e) => setPublicationYear(e.target.value)}
            className="select select-bordered select-sm w-full max-w-xs"
          >
            <option disabled value="">
              Filter by year
            </option>
            {years?.map((year) => (
              <option value={year.value}>{year.title}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearchValue("");
              setGenre("");
              setPublicationYear("");
            }}
            className="btn btn-sm btn-circle btn-outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      {body}
    </div>
  );
};

export default Books;
