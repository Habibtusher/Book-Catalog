/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useSingleBookQuery,
} from "../../redux/features/book/bookApi";
import Loading from "../shared/Loading";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { toast } from "react-hot-toast";
const BookDetails = () => {
  const { id } = useParams();
  const [reviewText, setReviewText] = useState<string>();

  const { data, isLoading } = useSingleBookQuery(id);
  const { user } = useAppSelector((state) => state.user);
  const [addReview, { isSuccess, data: addReviewData }] =
    useAddReviewMutation();

  const handleAddReview = () => {
    const data = {
      id: id,
      data: { review: reviewText },
    };
    addReview(data);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(addReviewData?.message);
      setReviewText("");
    }
  }, [isSuccess, addReviewData?.message]);
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
            <p className="text-2xl">{data?.data.title}</p>
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
    </div>
  );
};

export default BookDetails;
