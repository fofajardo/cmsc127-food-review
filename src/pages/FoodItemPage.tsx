import { FIMainPreview } from "./../components/food_item/FIMainPreview";
import React, { useEffect, useState } from "react";
import { NavigationBar } from "../components/common/NavigationBar.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { ReviewCard } from "../components/common/ReviewCard.tsx";
import { FIFilterCard } from "../components/food_item/FIFilterCard.tsx";
import { FIAddReview } from "../components/food_item/FIAddReview.tsx";
import { FoodItem, Review } from "../../models/_models.js";
import axios from "axios";
import { apiUrls } from "../apiHelper.ts";

export function FoodItemPage() {
  const [foodItem, setFoodItem] = useState({} as FoodItem);
  const [foodItemReviews, setFoodItemReviews] = useState([] as Review[]);

  const applyFoodReviewFilter = (month: string, sortInput: string) => {
    //@TODO: implement this
  };

  // upon render, fetch food item details and reviews
  useEffect(() => {
    // get the food item ID from the query string
    const foodItemId = new URLSearchParams(window.location.search).get(
      "id"
    );
    axios.get(apiUrls.foodItems(`?id=${foodItemId}&full=1`)).then(function(aResponse) {
      if (aResponse.data.data?.length > 0) {
        setFoodItem(aResponse.data.data[0]);
      }
    });
    axios.get(apiUrls.reviews(`?foodItemId=${foodItemId}&full=1`)).then(function(aResponse) {
      console.log(aResponse.data.data);
      setFoodItemReviews(aResponse.data.data);
    });
  }, []);

  return (
    <>
      <FIAddReview foodItem={foodItem} />
      <div className="flex flex-col items-center bg-yellow-100">
        <NavigationBar />
        <div className="flex min-h-[86vh] w-full max-w-[1080px] flex-1 flex-col items-stretch p-8">
          <div className="flex flex-col">
            <div className="card-body gap-0 pt-2">
              <FIMainPreview foodItem={foodItem} />
              {/* BOTTOM PANEL */}
              <div className=" flex min-h-[60vh] w-full flex-row rounded-2xl mt-4 gap-4">
                <aside className="flex-1 ">
                  {/* SIDE SECTION */}
                  <FIFilterCard applyFoodReviewFilter={applyFoodReviewFilter} />
                  <div className="card bg-white shadow-lg p-6 mt-4">
                    <h2 className="text-elbitgreen w-full text-left text-2xl font-bold">
                      <span className="flex flex-row items-center justify-start">
                        <span>Any thoughts? </span>
                      </span>
                    </h2>
                    <div className={"w-full mt-3"}>
                      <button
                        className="btn btn-primary w-full"
                        onClick={() => {
                          // open add review modal
                          const modal =
                            document.getElementById("addFoodReviewModal");
                          if (modal) {
                            (modal as HTMLDialogElement).showModal();
                          }
                        }}
                      >
                        Add Review
                      </button>
                    </div>
                  </div>
                </aside>
                {/* SECTION SHOWING REVIEW PREVIEW CARDS */}
                <main className="flex flex-[2] flex-col gap-[.1rem] bg-white card">
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
