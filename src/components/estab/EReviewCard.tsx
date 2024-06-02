import React from "react";
import { EstablishmentReview } from "../../models/Review";
import { RatingStarIndicator } from "../common/RatingStarIndicator";

export function EReviewCard({
  establishmentReview,
}: {
  establishmentReview: EstablishmentReview;
}) {
  return (
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
    </div>
  );
}
