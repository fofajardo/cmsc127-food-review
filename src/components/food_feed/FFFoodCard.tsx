import React from "react";
import { RatingStarIndicator } from "../common/RatingStarIndicator";
import { FoodItem } from "../../../models/_models.js";
import { useNavigate } from "react-router-dom";
import { YoursBadge } from "../common/YoursBadge";

export function FFFoodCard({ foodItem }: { foodItem: FoodItem }) {
  const navigate = useNavigate();
  return (
    <a
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/fooditem?id=${foodItem.id}`);
      }}
    >
      <div className="bounce-in productCard h-full card w-[20.5rem] border-0 bg-white text-left shadow-xl transition-all duration-300 hover:cursor-pointer xl:hover:-translate-y-2">
        <div className="bg-secondary  w-full rounded-none flex flex-col justify-center items-start text-white py-4 rounded-t-2xl ">
          <div className="flex flex-row w-full px-6 font-bold text-xl ">
            <p className="line-clamp-1">{foodItem.name}</p>
          </div>
          <a
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/establishment?id=${foodItem.foodEstablishmentId}`);
            }}
            className="text-white px-6 line-clamp-1 underline"
          >
            by: {foodItem?.foodEstablishment?.name}
          </a>
        </div>

        <div className="card-body gap-1 p-8 py-4 text-sm">
          {/* Food rating indicator */}
          <div className="card-actions flex-row justify-end">
            <p className="flex h-full flex-1 flex-col justify-center ">
              <span className="rounded-lg text-gray-600">Food Rating</span>

              <div className="ml-2">
                <RatingStarIndicator rating={3.2} />
              </div>
            </p>
          </div>
          <hr className="py-1 mt-1" />
          {/* Food type tags */}
          <div className="card-actions justify-end">
            <div className="flex h-full flex-1 flex-row justify-end flex-wrap px-2 pb-1">
              {foodItem?.types?.split(",")?.map((foodType, index) => {
                return (
                  <div
                    className="badge badge-primary p-3 m-1 ml-0"
                    id={foodItem.id + index.toString()}
                    key={index + foodType}
                  >
                    {foodType}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={
            "text-lg font-bold bg-yellow-50 rounded-b-2xl items-center p-4 px-8 text-secondary-content text-end flex flex-row " +
            (window.localStorage.getItem("is_admin") ? "justify-between" : "")
          }
        >
          <div className="font-normal">
            {window.localStorage.getItem("is_admin") == "true"
              ? YoursBadge()
              : null}
          </div>
          <p>Php {foodItem.price.toLocaleString()}</p>
        </div>
      </div>
    </a>
  );
}
