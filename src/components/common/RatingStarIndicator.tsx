import React from "react";

export const RatingStarIndicator = ({ rating }: { rating: number }) => {
  //generate random string for id
  const randomString = Math.random().toString(36).substring(7);

  const starFirstHalf = (checked) => (
    <input
      type="radio"
      name={"rating-" + randomString}
      className="bg-primary mask mask-star-2 mask-half-1 hover:cursor-default"
      checked={checked}
      disabled
    />
  );
  const starSecondHalf = (checked) => (
    <input
      type="radio"
      name={"rating-" + randomString}
      className="bg-primary mask mask-star-2 mask-half-2 hover:cursor-default"
      checked={checked}
      disabled
    />
  );

  // round the rating to the nearest 0.5
  const roundedRating = Math.round(rating * 2) / 2;
  return (
    <div className="flex flex-row justify-center items-center text-2xl text-gray-700 min-w-0 ">
      <h2>{rating}</h2>
      <div
        className="rating rating-md rating-half hover:cursor-default"
        id={"rating" + roundedRating.toString()}
      >
        <input
          type="radio"
          name={"rating-" + randomString}
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
