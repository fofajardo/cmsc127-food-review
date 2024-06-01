import React from "react";
import { Establishment } from "../../models/Establishment";
import { FeedContext } from "../../pages/FeedPage.tsx";
import { RatingStarIndicator } from "../common/RatingStarIndicator.tsx";

export function EFExpandModal() {
  const context = React.useContext(FeedContext);
  return (
    <dialog className="modal border-0 " id="establishmentExpandModal">
      <div className="modal-box bg-base-100 p-0">
        <div className="sticky top-0 z-50 flex flex-row justify-between bg-base-100 px-6 pb-3 pt-6 shadow-lg">
          <h2 className="text-elbitgreen  text-left text-2xl font-bold">
            {context.modalEstablishment.name}
          </h2>

          {/* close button */}
          <form method="dialog">
            <button className="btnstyle1 btn btn-neutral h-max min-h-0 p-3 text-white ">
              Close
            </button>
          </form>
        </div>

        {/* establishment details */}
        <div className={"card-body gap-0 pt-5"}>
          <div className="flex flex-row justify-between">
            <div className="card-actions justify-end w-full">
              <p className="flex h-full flex-col justify-center card bg-content shadow-xl p-2 py-4">
                <span className="text-center">Establishment Rating</span>
                <RatingStarIndicator
                  rating={context.modalEstablishment.average_rating}
                />
              </p>
              <p className="flex h-full flex-col justify-center card bg-content shadow-xl p-2 py-4">
                <span className="text-center">Food Rating</span>
                <RatingStarIndicator
                  rating={context.modalEstablishment.average_rating}
                />
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-center pt-4">
            <button
              onClick={() => {}}
              className={
                "btn btn-secondary w-2/3 mt-2 text-base text-white shadow-md "
              }
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
