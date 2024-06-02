import React, { useEffect, useState } from "react";
import { NavigationBar } from "../components/common/NavigationBar.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { RatingStarIndicator } from "../components/common/RatingStarIndicator.tsx";
import { FoodItem, sampleFoodItems } from "../models/FoodItem.ts";
import { ReviewCard } from "../components/common/ReviewCard.tsx";
import { sampleFoodItemReviews } from "../models/Review.ts";

export function FoodItemPage() {
  const [foodItem, setFoodItem] = useState(sampleFoodItems[0]);
  const [foodItemReviews, setFoodItemReviews] = useState(sampleFoodItemReviews);

  // upon render, fetch food item details and reviews
  useEffect(() => {
    //@TODO: implement this

    // get the food item ID from the query string
    const establishmentId = new URLSearchParams(window.location.search).get(
      "id"
    ); // use this to fetch food item details and reviews
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-yellow-100">
        <NavigationBar />
        <div className="flex min-h-[86vh] w-full max-w-[1080px] flex-1 flex-col items-stretch p-8">
          <div className="flex flex-col">
            <div className="card-body gap-0 pt-2">
              <div className="flex flex-col card bg-white p-6 shadow-lg border-[0.1px]">
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
                    <p className="text-secondary line-clamp-1">
                      From {foodItem.establishment_name}
                    </p>
                    <span className="text-xs font-normal text-gray-400">
                      Establishment ID: {foodItem.establishment_id}
                    </span>
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
              </div>
              {/* BOTTOM PANEL */}
              <div className="card bg-white flex min-h-[60vh] w-full flex-row rounded-2xl shadow-lg mt-4 border-[0.1px] bbg-white">
                <aside className="flex-1 border-r-[0.1px]">
                  {/* SIDE SECTION */}
                </aside>
                {/* SECTION SHOWING REVIEW PREVIEW CARDS */}
                <main className="flex flex-[2] flex-col gap-[.1rem]">
                  {foodItemReviews.map((review, index) => {
                    return <ReviewCard review={review} key={index} />;
                  })}
                </main>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
