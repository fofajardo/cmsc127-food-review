import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FeedContext } from "../../pages/FeedPage.tsx";
import { RatingStarIndicator } from "../common/RatingStarIndicator.tsx";
import { MdOutlineContentCopy } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function EFExpandModal() {
  // this is for keeping track of the copy id state
  const [copied, setCopied] = React.useState(false);
  const context = React.useContext(FeedContext);
  const navigate = useNavigate();
  return (
    <dialog className="modal border-0 " id="establishmentExpandModal">
      <div className="modal-box bg-base-100 p-0">
        <div className="sticky top-0 z-50 flex flex-row justify-between bg-base-100 px-6 pb-3 pt-6 shadow-lg">
          <h2 className="text-left text-2xl font-bold">
            {context.modalEstablishment.name}
          </h2>

          {/* close button */}
          <form method="dialog">
            <button className=" btn btn-neutral h-max min-h-0 p-3 text-white ">
              Close
            </button>
          </form>
        </div>

        {/* establishment details */}
        <div className={"card-body gap-0 pt-6"}>
          <div className="flex flex-row justify-between items-start">
            <div
              className="flex-row flex items-center text-lg gap-1 text-primary-content
            "
            >
              <IoLocationSharp className="text-lg" />
              <p className=" ">{context.modalEstablishment.location}</p>
            </div>
            <div className="flex flex-col justify-between">
              <div className="card-actions flex-col">
                <RatingStarIndicator
                  rating={context.modalEstablishment.averageRating}
                />
              </div>
            </div>
          </div>

          {/* <p className="indent-8 pt-4 ">
            {context.modalEstablishment.description}
          </p> */}
          <hr className="m-3" />
          <p className="text-sm text-gray-500 inline-flex items-center justify-end px-4">
            Establishment ID:{" "}
            <span>{context.modalEstablishment.id}</span>
            {/* render copy icon conditionally; initially a copy icon, then a checked icon upon clicking (for 5 seconds) */}
            {copied ? (
              <MdCheckCircleOutline className="ml-2  text-base" />
            ) : (
              <MdOutlineContentCopy
                onClick={() => {
                  // copy establishment id to clipboard
                  navigator.clipboard.writeText(
                    context.modalEstablishment.id.toString()
                  );
                  setCopied(true);
                  // reset copy state after 5 seconds; change back to copy icon
                  setTimeout(() => {
                    setCopied(false);
                  }, 5000);
                }}
                className="ml-2 hover:cursor-pointer text-base"
              />
            )}
          </p>

          <div className="flex flex-row justify-center pt-2">
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  "/establishment?id=" +
                    context.modalEstablishment.id
                );
              }}
              className={
                "btn text-base font-bold bg-primary-content border-0 text-white w-2/3 mt-2 shadow-md hover:bg-primary hover:shadow-lg"
              }
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
