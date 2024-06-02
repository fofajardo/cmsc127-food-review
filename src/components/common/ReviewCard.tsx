import React from "react";
import { Review } from "../../models/Review";
import { RatingStarIndicator } from "./RatingStarIndicator";
import { DeleteReviewModal } from "./DeleteReviewModal";

export function ReviewCard({
  review: establishmentReview,
}: {
  review: Review;
}) {
  const modalID = `deleteReviewModal${establishmentReview.review_id}`;
  return (
    <>
      <DeleteReviewModal review={establishmentReview} modalID={modalID} />
      <div
        className={
          "bounce-in card flex flex-col bg-white p-8 py-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-2 hover:translate-x-2 "
        }
      >
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-bold">@{establishmentReview.username}</h2>
          <div className="flex flex-col justify-between">
            <RatingStarIndicator rating={establishmentReview.rating} />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <span className="font-normal text-xs text-gray-400">
            Review ID: {establishmentReview.review_id} |{" "}
            {/* format date into Month 00, 0000 */}
            {new Date(establishmentReview.date_written).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </span>
          <span className="text-right text-xs text-gray-400">
            User ID: {establishmentReview.user_id}
          </span>
        </div>
        <p
          className="text-clamp-1 w-min- w-min-10 text-sm text-gray-600 mt-2
          "
        >
          {establishmentReview.notes}
        </p>
        {/* Manage establishment section for Admin and Owner */}
        <div
          className={
            "card bg-accent w-full px-8 py-2 mt-4 shadow-lg flex flex-row items-center " +
            (window.localStorage.getItem("user_id") ==
              establishmentReview.user_id ||
            window.localStorage.getItem("is_admin")
              ? ""
              : "hidden")
          }
        >
          <h2 className="text-lg font-bold text-white flex-1">Manage Review</h2>
          <div className="flex flex-row gap-2 items-center">
            <button
              onClick={() => {
                const modal = document.getElementById(modalID);
                if (modal) {
                  (modal as HTMLDialogElement).showModal();
                }
              }}
              className="btn btn-error text-white min-h-0 py-3 max-h-none h-max"
            >
              Delete
            </button>
            <button
              onClick={() => {
                // open edit establishment modal
                const modal = document.getElementById("editEstablishmentModal");
                if (modal) {
                  (modal as HTMLDialogElement).showModal();
                }
              }}
              className="btn btn-success text-white min-h-0 py-3 px-8 max-h-none h-max"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
