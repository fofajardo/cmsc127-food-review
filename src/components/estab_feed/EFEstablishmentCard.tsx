import React from "react";
import { RatingStarIndicator } from "../common/RatingStarIndicator";

// @todo: pass props to the component to display the establishment name, establishment rating, and food rating
export function EFEstablishmentCard({}: {}) {
  return (
    <>
      <div
        onClick={() => {
          //open establishment modal
          const modal = document.getElementById("establishmentExpandModal");
          if (modal) {
            (modal as HTMLDialogElement).showModal();
          }
        }}
        className="bounce-in productCard card w-[20.5rem] border-0 bg-white text-left shadow-xl transition-all duration-300 hover:cursor-pointer xl:hover:-translate-y-2"
      >
        <figure>
          <div className="bg-primary-content h-16 w-full rounded-none flex flex-col justify-center items-center text-white">
            <div className="flex flex-row w-full px-6 font-bold text-xl">
              <p className="line-clamp-1">Something store name</p>
            </div>
          </div>
        </figure>
        <div className="card-body gap-1 p-8 py-4 text-sm">
          <div className="w-max">
            <div className="card-actions justify-end">
              <p className="flex h-full flex-1 flex-col justify-center ">
                <span className="rounded-lg ">Establishment Rating</span>

                <RatingStarIndicator rating={3.9} />
              </p>
            </div>
            <div className="card-actions justify-end">
              <p className="flex h-full flex-1 flex-col justify-center ">
                <span className="rounded-lg">Food Rating</span>
                <RatingStarIndicator rating={3.2} />
              </p>
            </div>
          </div>

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
