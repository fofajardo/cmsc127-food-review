import React from "react";
import { RatingStarIndicator } from "../common/RatingStarIndicator";
import { Establishment } from "../../models/Establishment";
import { FeedContext } from "../../pages/FeedPage";

// @todo: pass props to the component to display the establishment name, establishment rating, and food rating
export function EFEstablishmentCard({
  establishment,
}: {
  establishment: Establishment;
}) {
  const context = React.useContext(FeedContext);
  return (
    <>
      <div
        onClick={() => {
          //open establishment modal
          const modal = document.getElementById("establishmentExpandModal");
          if (modal) {
            context.setModalEstablishment(establishment);
            (modal as HTMLDialogElement).showModal();
          }
        }}
        className="bounce-in productCard card w-[20.5rem] border-0 bg-white text-left shadow-xl transition-all duration-300 hover:cursor-pointer xl:hover:-translate-y-2"
      >
        <figure>
          <div className="bg-primary-content w-full rounded-none flex flex-col justify-center items-center text-white py-4">
            <div className="flex flex-row w-full px-6 font-bold text-xl">
              <p className="line-clamp-1">{establishment.name}</p>
            </div>
          </div>
        </figure>
        <div className="flex flex-col justify-center gap-1 p-8 py-4 text-sm">
          <p className="flex flex-col justify-center ">
            <span className="rounded-lg text-gray-600">
              Establishment Rating
            </span>
            <RatingStarIndicator rating={establishment.average_rating} />
          </p>
          <hr className="p-1 mt-1" />

          <p className="line-clamp-3 text-gray-600">
            {establishment.description}
          </p>

          <button
            className="mt-2 btn rounded-lg font-normal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            View Food Items
          </button>
        </div>
      </div>
    </>
  );
}
