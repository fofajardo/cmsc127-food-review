import React from "react";
import { RatingStarIndicator } from "../common/RatingStarIndicator";
import { FoodEstablishment } from "../../../models/_models";
import { FeedContext } from "../../pages/FeedPage";
import { IoLocationSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { YoursBadge } from "../common/YoursBadge";

// @todo: pass props to the component to display the establishment name, establishment rating, and food rating
export function EFEstablishmentCard({
  establishment,
}: {
  establishment: FoodEstablishment;
}) {
  const context = React.useContext(FeedContext);
  const navigate = useNavigate();

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
        className="h-full bounce-in productCard card w-[20.5rem] border-0 bg-white text-left shadow-xl transition-all duration-300 hover:cursor-pointer xl:hover:-translate-y-2"
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
            <RatingStarIndicator rating={establishment.averageRating} />
          </p>
          <hr className="p-1 mt-1" />

          <button
            className="mt-2 btn rounded-lg font-normal"
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `/feed?establishmentid=${establishment.id}`
              ); // update URL with new "id"
              context.setToggle(true);
            }}
          >
            View Food Items
          </button>
        </div>
        <div
          className={
            "flex flex-row bg-amber-50 rounded-b-2xl p-4 " +
            (window.localStorage.getItem("user_id") === "0" /*establishment.user_id*/ ||
            window.localStorage.getItem("is_admin")
              ? "justify-between"
              : "justify-end")
          }
        >
          {window.localStorage.getItem("user_id") === "0" /*establishment.user_id*/ ||
          window.localStorage.getItem("is_admin") ? (
            <YoursBadge />
          ) : null}

          <div className="flex-row flex items-center text-lg gap-1 text-primary-content badge-primary rounded-full px-2 py-1 w-max">
            <IoLocationSharp className="text-sm" />
            <p className="text-sm line-clamp-1">{establishment.location}</p>
          </div>
        </div>
      </div>
    </>
  );
}
