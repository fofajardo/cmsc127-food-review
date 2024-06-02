import React from "react";
import { RatingStarIndicator } from "../common/RatingStarIndicator";
import { FoodItem } from "../../models/FoodItem";

export function EFoodCard({ foodItem }: { foodItem: FoodItem }) {
  return (
    <div
      className={
        "bounce-in card flex flex-col bg-white p-8 py-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-2 hover:translate-x-2 "
      }
    >
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold">{foodItem.name}</h2>
        <div className="flex flex-col justify-between">
          <RatingStarIndicator rating={foodItem.average_rating} />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="text-sm text-secondary line-clamp-1">
            From {foodItem.establishment_name}
          </p>
          <span className="font-normal text-xs text-gray-400">
            Food Item ID: {foodItem.food_item_id}
          </span>
        </div>
        <span className="text-right text-xs text-gray-400">
          Establishment ID: {foodItem.establishment_id}
        </span>
      </div>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-row flex-wrap">
          {foodItem.food_types.map((tag, index) => (
            <p
              key={index + tag}
              className="text-xs text-primary-content bg-primary px-2 py-1 rounded-full mr-2"
            >
              {tag}
            </p>
          ))}
        </div>
        <p
          className="text-clamp-1 text-primary-content bg-primary max-w-max px-4 py-1 rounded-full text-xl mt-2
          "
        >
          Php {foodItem.price}
        </p>
      </div>
    </div>
  );
}
