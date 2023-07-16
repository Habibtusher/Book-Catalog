/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useDeleteBookMutation,
  useSingleBookQuery,
} from "../../redux/features/book/bookApi";
import Loading from "../shared/Loading";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "react-modal";
const BookDetails = () => {
  const navigator = useNavigate()
  const { id } = useParams();
  const [reviewText, setReviewText] = useState<string>();

  const { data, isLoading } = useSingleBookQuery(id,{pollingInterval:30000,refetchOnFocus:true,refetchOnMountOrArgChange:true});
  const [delteBook,{isSuccess:deleteBookSuccess,data:deleteBookData}] = useDeleteBookMutation();
  const { user } = useAppSelector((state) => state.user);
  const [addReview, { isSuccess, data: addReviewData }] =
    useAddReviewMutation();

  const handleAddReview = () => {
    const data = {
      id: id,
      data: { review: reviewText },
    };
    if (reviewText) {
      addReview(data);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(addReviewData?.message);
      setReviewText("");
    }
    if(deleteBookSuccess){
      toast.success(deleteBookData?.message)
      navigator("/books")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, addReviewData?.message,deleteBookData?.message,deleteBookSuccess]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
const handleDeleteBook =()=>{
  delteBook(id)
}
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-2/4 mx-auto pb-10">
      <p className="text-2xl">Book Details</p>
      <div className="pt-10">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-y-5">
          <div>
            <img src="https://i.ibb.co/bN1GKhL/Untitled.png" alt="book cover" />
          </div>
          <div>
            <div className="flex justify-between">
              <p className="text-2xl">{data?.data.title}</p>
              {data.data.addBy === user.email && (
                <div className="flex gap-3 items-center text-blue-700">
                  <p onClick={()=>navigator(`/edit-book/${data?.data._id}`)} className="cursor-pointer text-sm">Edit</p>
                  <p
                    onClick={() => openModal()}
                    className="cursor-pointer text-sm"
                  >
                    Delete
                  </p>
                </div>
              )}
            </div>
            <p className="text-sm text-slate-400">by {data?.data.author}</p>
            <p className="text-base text-slate-600 font-medium">
              {data?.data.genre}
            </p>
            <p className="text-base text-slate-600 font-medium">
              {data?.data.publicationDate}
            </p>
            <p className="text-base text-slate-600">
              ({data?.data.reviews.length ? data?.data.reviews.length : 0})
              reviews
            </p>
            {user?.email && (
              <div className="pt-28 flex items-center gap-10">
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write review..."
                  className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                ></textarea>
                <button
                  onClick={() => handleAddReview()}
                  className="btn btn-neutral btn-sm"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pt-10">
        {data?.data.reviews.map((review: string) => (
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" />
              </div>
            </div>
            <p>{review}</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Confirm"
      >
        <p className="py-5 text-xl text-red-500">Are you sure? want to delete this book!</p>

      
        <div className="flex gap-5 justify-end">
          <button className="btn btn-sm " onClick={closeModal}>close</button>
          <button className="btn btn-sm btn-neutral" onClick={handleDeleteBook}>Ok</button>
        </div>
      </Modal>
    </div>
  );
};

export default BookDetails;
