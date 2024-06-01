import React, { useEffect } from "react";
import { RatingStarIndicator } from "../common/RatingStarIndicator";
import { FoodItem } from "../../models/FoodItem";

export function FFFoodCard({ foodItem }: { foodItem: FoodItem }) {
  let establishmentName = "Establishment Name";

  // upon render, fetch establishment name
  useEffect(() => {
    // @TODO: fetch establishment name
  }, []);

  return (
    <>
      <div className="bounce-in productCard card w-[20.5rem] border-0 bg-white text-left shadow-xl transition-all duration-300 hover:cursor-pointer xl:hover:-translate-y-2">
        <div className="bg-secondary  w-full rounded-none flex flex-col justify-center items-start text-white py-4 rounded-t-2xl ">
          <div className="flex flex-row w-full px-6 font-bold text-xl ">
            <p className="line-clamp-1">{foodItem.name}</p>
          </div>
          <p className="text-white px-6 line-clamp-1">
            by: {establishmentName}
          </p>
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
              {foodItem.food_types.map((foodType, index) => {
                return (
                  <div
                    className="badge badge-primary p-3 m-1 ml-0"
                    id={foodItem.food_item_id + index.toString()}
                  >
                    {foodType}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="text-lg font-bold bg-yellow-50 rounded-b-2xl p-4 px-8 text-secondary-content text-end">
          Php {foodItem.price.toLocaleString()}
        </div>
      </div>
    </>
  );
}
