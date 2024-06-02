import React, { useEffect, useState } from "react";
import { NavigationBar } from "../components/common/NavigationBar.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { IoLocationSharp } from "react-icons/io5";
import { RatingStarIndicator } from "../components/common/RatingStarIndicator.tsx";
import { sampleEstablishment } from "../models/Establishment.ts";
import { MdCheckCircleOutline, MdOutlineContentCopy } from "react-icons/md";
import { EReviewCard } from "../components/estab/EReviewCard.tsx";
import { sampleEstablishmentReviews } from "../models/Review.ts";
import { FoodItem } from "../models/FoodItem.ts";
import { EAddReviewModal } from "../components/estab/EAddReviewModal.tsx";

export function EstablishmentPage() {
  const [establishment, setEstablishments] = useState(sampleEstablishment);
  const [activeTab, setActiveTab] = useState(0);
  const [establishmentReviews, setEstablishmentReviews] = useState(
    sampleEstablishmentReviews
  );
  const [foodItems, setFoodItems] = useState([] as FoodItem[]);

  // upon render, fetch establishment details, all of its reviews, and food items
  useEffect(() => {
    //@TODO: implement this
    // use setEstablishment, setEstablishmentReviews, and setFoodItems

    // get the establishment ID from the query string
    const establishmentId = new URLSearchParams(window.location.search).get(
      "id"
    ); // use this to fetch establishment details
  }, []);

  // this is for keeping track of the copy id state
  const [copied, setCopied] = React.useState(false);
  return (
    <>
      <EAddReviewModal />
      <div className="flex flex-col items-center bg-slate-100">
        <NavigationBar />
        <div className="flex min-h-[86vh] w-full max-w-[1080px] flex-1 flex-col items-stretch p-8">
          <div className="card bg-white shadow-xl my-8 flex flex-col p-4">
            <div className={"card-body gap-0 pt-6"}>
              {/* DETAILS OF THE ESTABLISHMENT */}
              <div
                className="flex-row flex items-center text-lg gap-1 text-primary-content
            "
              >
                <IoLocationSharp className="text-xs" />
                <p className="text-sm">{establishment.location}</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-left text-3xl font-bold">
                  {establishment.name}
                </h2>
                <div className="flex flex-col justify-between card bg-yellow-50 px-4 py-2 rounded-lg shadow-md">
                  <div className="card-actions flex-row items-center">
                    <p className="text-lg font-bold">Overall Average: </p>
                    <RatingStarIndicator
                      rating={establishment.average_rating}
                    />
                  </div>
                </div>
              </div>
              <p className="indent-8 pt-4">{establishment.description}</p>

              <p className="text-sm text-gray-500 inline-flex items-center justify-end">
                Establishment ID:{" "}
                <span className="ml-1">
                  {establishment.food_establishment_id}
                </span>
                {/* render copy icon conditionally; initially a copy icon, then a checked icon upon clicking (for 5 seconds) */}
                {copied ? (
                  <MdCheckCircleOutline className="ml-1 text-base" />
                ) : (
                  <MdOutlineContentCopy
                    onClick={() => {
                      // copy establishment id to clipboard
                      navigator.clipboard.writeText(
                        establishment.food_establishment_id
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
              {/* BOTTOM PANEL */}
              <div className="card flex min-h-[60vh] w-full flex-row rounded-xl shadow-lg mt-4">
                <aside className="flex-1">
                  {/* SIDE TABS */}
                  <ul className="menu h-full rounded-l-xl border-b-[0.01rem] border-r-[.01rem] py-4 pr-4 sm:border-b-0">
                    <li>
                      <h2 className="menu-title text-xl text-neutral">
                        Browse
                      </h2>
                      <ul>
                        <li>
                          <button
                            className={activeTab === 0 ? "active" : ""}
                            onClick={() => {
                              setActiveTab(0);
                            }}
                          >
                            Establishment Reviews
                          </button>
                        </li>
                        <li>
                          <button
                            className={activeTab === 1 ? "active" : ""}
                            onClick={() => {
                              setActiveTab(1);
                            }}
                          >
                            Food Items
                          </button>
                        </li>
                      </ul>
                    </li>
                    <div
                      className={
                        "w-full py-8 pl-4 pr-2 " +
                        (activeTab == 0 ? "" : "hidden")
                      }
                    >
                      <button
                        className="btn btn-primary w-full"
                        onClick={() => {
                          // open add review modal
                          const modal = document.getElementById(
                            "addEstablishmentReviewModal"
                          );
                          if (modal) {
                            (modal as HTMLDialogElement).showModal();
                          }
                        }}
                      >
                        Add review
                      </button>
                    </div>
                  </ul>
                </aside>
                {/* SECTION SHOWING REVIEW PREVIEW CARDS */}
                <main className="flex flex-[2] flex-col gap-[.1rem]">
                  {activeTab === 0 ? (
                    <>
                      {/* ESTABLISHMENT REVIEW CARDS */}
                      {establishmentReviews.map((review, index) => {
                        return (
                          <EReviewCard
                            key={index}
                            establishmentReview={review}
                          />
                        );
                      })}
                      {establishmentReviews.length === 0 ? (
                        <div className="flex flex-row justify-center items-center text-gray-500 text-sm h-full">
                          Uh-oh, there's nothing to see here yet.
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <>
                      {foodItems.length === 0 ? (
                        <div className="flex flex-row justify-center items-center text-gray-500 text-sm h-full">
                          Uh-oh, there's nothing to see here yet.
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  )}
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
