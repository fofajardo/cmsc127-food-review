import React from "react";

const starFirstHalf = (checked) => (
  <input
    type="radio"
    name="rating-10"
    className="bg-primary mask mask-star-2 mask-half-1"
    checked={checked}
  />
);
const starSecondHalf = (checked) => (
  <input
    type="radio"
    name="rating-10"
    className="bg-primary mask mask-star-2 mask-half-2"
    checked={checked}
  />
);

export const RatingStarIndicator = ({ rating }: { rating: number }) => {
  // round the rating to the nearest 0.5
  const roundedRating = Math.round(rating * 2) / 2;
  return (
    <div className="flex flex-row justify-start items-center text-2xl text-gray-700">
      <h2>{rating}</h2>
      <div className="rating rating-md rating-half">
        <input
          type="radio"
          name="rating-10"
          className="rating-hidden"
          checked={roundedRating == 0}
        />
        {starFirstHalf(roundedRating >= 0.5)}
        {starSecondHalf(roundedRating >= 1.0)}
        {starFirstHalf(roundedRating >= 1.5)}
        {starSecondHalf(roundedRating >= 2.0)}
        {starFirstHalf(roundedRating >= 2.5)}
        {starSecondHalf(roundedRating >= 3.0)}
        {starFirstHalf(roundedRating >= 3.5)}
        {starSecondHalf(roundedRating >= 4.0)}
        {starFirstHalf(roundedRating >= 4.5)}
        {starSecondHalf(roundedRating >= 5.0)}
      </div>
    </div>
  );
};
