import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FeedContext } from "../../pages/FeedPage.tsx";
import { FoodEstablishment } from "../../../models/_models.js";

export function EAddReviewModal({
  establishment,
}: {
  establishment: FoodEstablishment;
}) {
  const [submitComplete, setSubmitComplete] = useState(false);
  const [starRating, setStarRating] = useState(5);

  const [formData, setFormData] = useState({
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {
      description: "",
    };
    if (!formData.description) newErrors.description = "Comment is required";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      //@TODO: implement add establishment review
      // id from establishment.food_establishment_id
      // use formData and starRating to get the review details
      setSubmitComplete(true); // simulate successful submission
    }
  };

  return (
    <dialog className="modal" id="addEstablishmentReviewModal">
      <div className="modal-box bg-base-100 p-0">
        <div className="sticky top-0 z-50 flex flex-row justify-between bg-base-100 px-6 pb-3 pt-6 shadow-lg">
          <h2 className="text-left text-2xl font-bold">Review Establishment</h2>
          <form method="dialog">
            <button
              className={
                "btn btn-neutral h-max min-h-0 p-3 text-white " +
                (submitComplete ? "hidden" : "")
              }
            >
              Close
            </button>
          </form>
        </div>
        {/* Form Inputs */}
        <div
          className={"card-body gap-4 pt-6 " + (submitComplete ? "hidden" : "")}
        >
          <div className="flex flex-col gap-1">
            <textarea
              name="description"
              className="input input-bordered w-full resize-y pt-2 min-h-10"
              placeholder="Comments"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <span className="text-red-500 ml-2">{errors.description}</span>
            )}
          </div>
          {/* Rating */}
          <div className="flex flex-row justify-start mb-2">
            <div className="rating rating-lg rating-half flex flex-row items-center">
              <input
                type="radio"
                name="rating-10"
                className="rating-hidden"
                id="rating0"
                onClick={() => setStarRating(0)}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-primary mask mask-star-2 mask-half-1"
                id="rating0.5"
                onClick={() => setStarRating(0.5)}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-primary mask mask-star-2 mask-half-2"
                id="rating1"
                onClick={() => setStarRating(1)}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-primary mask mask-star-2 mask-half-1"
                id="rating1.5"
                onClick={() => setStarRating(1.5)}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-primary mask mask-star-2 mask-half-2"
                id="rating2"
                onClick={() => setStarRating(2)}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-primary mask mask-star-2 mask-half-1"
                id="rating2.5"
                onClick={() => setStarRating(2.5)}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-primary mask mask-star-2 mask-half-2"
                id="rating3"
                onClick={() => setStarRating(3)}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-primary mask mask-star-2 mask-half-1"
                id="rating3.5"
                onClick={() => setStarRating(3.5)}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-primary mask mask-star-2 mask-half-2"
                id="rating4"
                onClick={() => setStarRating(4)}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-primary mask mask-star-2 mask-half-1"
                id="rating4.5"
                onClick={() => setStarRating(4.5)}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-primary mask mask-star-2 mask-half-2"
                id="rating5"
                onClick={() => setStarRating(5)}
              />
              <p className="text-4xl font-bold ml-2">
                {starRating > 1 ? starRating + " stars" : starRating + " star"}{" "}
              </p>
            </div>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary w-full">
            Submit
          </button>
        </div>
        {/* Success Indicator */}
        <div
          className={
            "mt-1 flex flex-col items-center justify-center gap-8 rounded-full border-0 p-8 " +
            (submitComplete ? "" : " hidden")
          }
        >
          <div className="flex flex-col items-center">
            <FaCheckCircle className="mb-4 text-6xl text-success" />
            <span className="text-xl font-bold text-success">
              Submission complete!
            </span>
            <span className="text-lg font-normal">
              Your review has been submitted successfully.
            </span>
          </div>
          <form className="flex w-1/2" method="dialog">
            <button
              onClick={() => location.reload()}
              className="btn btn-success w-full text-white"
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
