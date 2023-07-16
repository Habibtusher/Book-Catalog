import { format } from "date-fns";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-hot-toast";
import {
  useEditBookMutation,
  useSingleBookQuery,
} from "../../redux/features/book/bookApi";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../shared/Loading";
import { useEffect } from "react";
type FormInputs = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
};
const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const [
    editBook,
    { isError, isSuccess, data: editedData, error, isLoading: editLoading },
  ] = useEditBookMutation();
  const { data, isLoading } = useSingleBookQuery(id, {
    pollingInterval: 30000,
    refetchOnFocus: true,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (values) => {
    const formattedDate = format(
      new Date(values.publicationDate),
      "EEE MMM d yyyy"
    );
    const year = format(new Date(values.publicationDate), "yyyy");
    const data = {
      id,
      data: {
        title: values.title,
        author: values.author,
        genre: values.genre,
        publicationYear: year,
        publicationDate: formattedDate,
        addBy: user.email,
      },
    };
    if (!user.email) {
      toast.error("To add new book you need to login");
    } else {
      editBook(data);
    }
  };
  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success(editedData?.message);
      navigate("/books");
    }

    if (!isLoading && isError && error) {
      toast.error(error?.data.errorMessages[0].message);
    }
  }, [isLoading, isSuccess, isError, error, editedData, reset]);
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
  if (isLoading || editLoading) {
    return <Loading />;
  }
  console.log(format(new Date(data?.data.publicationDate), "yyyy-MM-yy"));
  return (
    <div className="w-3/6 mx-auto pb-16">
      <div className="">
        <p className="text-2xl pb-10 text-center">Edit Book</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Title:</label>
            <input
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              defaultValue={data?.data.title}
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Title is required.</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author:</label>
            <input
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              defaultValue={data?.data.author}
              {...register("author", { required: true })}
            />
            {errors.author && (
              <span className="text-red-500">Author is required.</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Genre:</label>
            <select
              defaultValue={data?.data.genre}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              {...register("genre", { required: true })}
            >
              {genres.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.title}
                </option>
              ))}
            </select>
            {errors.genre && (
              <span className="text-red-500">Genre is required.</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Publication Date:</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              defaultValue={format(
                new Date(data?.data.publicationDate),
                "yyyy-MM-yy"
              )}
              {...register("publicationDate", { required: true })}
            />
            {errors.publicationDate && (
              <span className="text-red-500">
                Publication Date is required.
              </span>
            )}
          </div>
          <div className="text-right ">
            <button
              type="submit"
              className="btn-neutral  text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
