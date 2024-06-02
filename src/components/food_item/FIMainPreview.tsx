import React from "react";
import { FoodItem } from "../../models/FoodItem";
import { RatingStarIndicator } from "../common/RatingStarIndicator";
import { useNavigate } from "react-router-dom";
import { FIDeleteModal } from "./FIDeleteModal";
import { FIEditModal } from "./FIEditModal";

export function FIMainPreview({ foodItem }: { foodItem: FoodItem }) {
  const navigate = useNavigate();
  return (
    <>
      <FIDeleteModal foodItem={foodItem} />
      <FIEditModal foodItem={foodItem} />
      <div className="bounce-in flex flex-col card bg-white p-8 shadow-lg border-[0.1px]">
        {/* DETAILS OF THE FOOD ITEM */}
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold">{foodItem.name}</h2>
          <div className="flex-row items-center bg-yellow-50 p-2 px-4 shadow-md rounded-full flex">
            <p className="text-lg font-bold">Overall Average: </p>
            <RatingStarIndicator rating={foodItem.average_rating} />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <a
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/establishment?id=${foodItem.establishment_id}`);
              }}
              className="text-secondary line-clamp-1"
            >
              From {foodItem.establishment_name}
            </a>
            <div className="text-xs font-normal text-gray-400">
              Establishment ID: {foodItem.establishment_id}
            </div>
          </div>
          <span className="text-right text-xs text-gray-400 mt-2 mr-4">
            Food Item ID: {foodItem.food_item_id}
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
        {/* Manage establishment section for Admin and Owner */}
        <div
          className={
            "card bg-accent w-full px-8 py-4 mt-4 shadow-lg flex flex-row items-center " +
            (window.localStorage.getItem("is_admin") ? "" : "hidden")
          }
        >
          <h2 className="text-2xl font-bold text-white flex-1">
            Manage this Food Item
          </h2>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => {
                const modal = document.getElementById("deleteFoodItemModal");
                if (modal) {
                  (modal as HTMLDialogElement).showModal();
                }
              }}
              className="btn btn-error text-white"
            >
              Delete
            </button>
            <button
              onClick={() => {
                // open edit establishment modal
                const modal = document.getElementById("editFoodItemModal");
                if (modal) {
                  (modal as HTMLDialogElement).showModal();
                }
              }}
              className="btn btn-success text-white px-8"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
