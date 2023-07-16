import { format, getYear } from "date-fns";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import { useAddNewBookMutation } from "../../redux/features/book/bookApi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type FormInputs = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
};

const AddNewBooks = () => {
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  const { user } = useAppSelector((state) => state.user);
  const [addBook, { isLoading, isError, isSuccess, data, error }] =
    useAddNewBookMutation();
  const onSubmit: SubmitHandler<FormInputs> = (values) => {
    const formattedDate = format(
      new Date(values.publicationDate),
      "EEE MMM d yyyy"
    );
    const year = format(new Date(values.publicationDate), "yyyy");
    const data = {
      title: values.title,
      author: values.author,
      genre: values.genre,
      publicationYear: year,
      publicationDate: formattedDate,
      addBy: user.email,
    };
    if (!user.email) {
      toast.error("To add new book you need to login");
    } else {
      addBook(data);
    }
  };
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
  useEffect(() => {
    
    if (!isLoading && isSuccess) {
      toast.success(data?.message);
      reset();
    }

    if (!isLoading && isError && error) {
      toast.error(error?.data.errorMessages[0].message);
    }
  }, [isLoading, isSuccess, isError, error, data,reset]);
  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
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
            {...register("author", { required: true })}
          />
          {errors.author && (
            <span className="text-red-500">Author is required.</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Genre:</label>
          <select
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
            {...register("publicationDate", { required: true })}
          />
          {errors.publicationDate && (
            <span className="text-red-500">Publication Date is required.</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewBooks;
