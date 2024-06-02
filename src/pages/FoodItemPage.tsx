import { FIMainPreview } from "./../components/food_item/FIMainPreview";
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
              <FIMainPreview foodItem={foodItem} />
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
