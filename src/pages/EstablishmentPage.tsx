import React, { act, useEffect, useState } from "react";
import { NavigationBar } from "../components/common/NavigationBar.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { IoLocationSharp } from "react-icons/io5";
import { RatingStarIndicator } from "../components/common/RatingStarIndicator.tsx";
import { MdCheckCircleOutline, MdOutlineContentCopy } from "react-icons/md";
import { ReviewCard } from "../components/common/ReviewCard.tsx";
import { EAddReviewModal } from "../components/estab/EAddReviewModal.tsx";
import { EFoodCard } from "../components/estab/EFoodCard.tsx";
import { EAddFoodItemModal } from "../components/estab/EAddFoodItemModal.tsx";
import { EDeleteModal } from "../components/estab/EDeleteModal.tsx";
import { EEditModal } from "../components/estab/EEditModal.tsx";
import { FoodEstablishment, FoodItem, Review } from "../../models/_models.js";
import axios from "axios";
import { apiUrls } from "../apiHelper.ts";

export function EstablishmentPage() {
  const [establishment, setEstablishment] = useState({} as FoodEstablishment);
  const [activeTab, setActiveTab] = useState(0); // 0: establishment reviews, 1: food items
  const [establishmentReviews, setEstablishmentReviews] = useState(
    [] as Review[]
  );
  const [foodItems, setFoodItems] = useState(
    [] as FoodItem[]
  );

  // upon render, fetch establishment details, all of its reviews, and food items
  useEffect(() => {
    //@TODO: implement this
    // use setEstablishment, setEstablishmentReviews, and setFoodItems

    // get the establishment ID from the query string
    const establishmentId = new URLSearchParams(window.location.search).get(
      "id"
    );
    axios.get(apiUrls.foodEstablishments(establishmentId?.toString())).then(function(aResponse) {
      setEstablishment(aResponse.data.data);
    });
    axios.get(apiUrls.reviews(`?establishmentId=${establishmentId}&full=1`)).then(function(aResponse) {
      setEstablishmentReviews(aResponse.data.data);
    });
    axios.get(apiUrls.foodItems(`?establishmentId=${establishmentId}&full=1`)).then(function(aResponse) {
      setFoodItems(aResponse.data.data);
    });
  }, []);

  const [applyFilterEnabled, setApplyFilterEnabled] = useState(false);
  const checkIfFilterInputsNotEmpty = () => {
    const yearInput = (document.getElementById("yearInput") as HTMLInputElement)
      .value;
    const monthSelect = (
      document.getElementById("monthSelect") as HTMLSelectElement
    ).value;
    if (yearInput && monthSelect !== "Month") {
      setApplyFilterEnabled(true);
    } else {
      setApplyFilterEnabled(false);
    }
  };

  const handleFilter = () => {
    // get filter inputs
    const yearInput = (document.getElementById("yearInput") as HTMLInputElement)
      .value;
    const monthSelect = (
      document.getElementById("monthSelect") as HTMLSelectElement
    ).value;
    // @TODO: implement filter logic with setEstablishmentReviews()
  };

  const handleClear = () => {
    // clear filter inputs
    (document.getElementById("yearInput") as HTMLInputElement).value = "";
    (document.getElementById("monthSelect") as HTMLSelectElement).value =
      "Month";
    setApplyFilterEnabled(false);
    // @TODO: implement filter logic with setEstablishmentReviews()
  };

  // this is for keeping track of the copy id state
  const [copied, setCopied] = React.useState(false);
  return (
    <>
      {/* modals */}
      <EAddReviewModal establishment={establishment} />
      <EAddFoodItemModal />
      <EEditModal establishment={establishment} />
      <EDeleteModal establishment={establishment} />
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
                      rating={establishment.averageRating}
                    />
                  </div>
                </div>
              </div>
              {/* <p className="indent-8 pt-4">{establishment.description}</p> */}

              <p className="text-sm text-gray-500 inline-flex items-center justify-end">
                Establishment ID:{" "}
                <span className="ml-1">
                  {establishment.id}
                </span>
                {/* render copy icon conditionally; initially a copy icon, then a checked icon upon clicking (for 5 seconds) */}
                {copied ? (
                  <MdCheckCircleOutline className="ml-1 text-base" />
                ) : (
                  <MdOutlineContentCopy
                    onClick={() => {
                      // copy establishment id to clipboard
                      navigator.clipboard.writeText(
                        establishment.id.toString()
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
              {/* Manage establishment section for Admin and Owner */}
              <div
                className={
                  "card bg-accent w-full px-8 py-4 mt-4 shadow-lg flex flex-row items-center " +
                  (window.localStorage.getItem("is_admin") ? "" : "hidden")
                }
              >
                <h2 className="text-2xl font-bold text-white flex-1">
                  Manage this Establishment
                </h2>
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => {
                      const modal = document.getElementById(
                        "deleteEstablishmentModal"
                      );
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
                      const modal = document.getElementById(
                        "editEstablishmentModal"
                      );
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
              {/* BOTTOM PANEL */}
              <div className="card flex min-h-[60vh] w-full flex-row rounded-xl shadow-lg mt-4 border-[0.1px]">
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
                    {/* hide button if all review tab is selected */}
                    <div className={"w-full pt-8 pb-4 pl-4 pr-2 "}>
                      <button
                        className="btn btn-primary w-full"
                        onClick={() => {
                          // open add review modal
                          const modal = document.getElementById(
                            activeTab == 0
                              ? "addEstablishmentReviewModal"
                              : "addFoodItemModal"
                          );
                          if (modal) {
                            (modal as HTMLDialogElement).showModal();
                          }
                        }}
                      >
                        {activeTab == 0 ? "Add review" : "Add food item"}
                      </button>
                    </div>
                    <div
                      className={
                        "pr-4 pb-4 pl-6 " + (activeTab == 0 ? "" : "hidden")
                      }
                    >
                      <hr />
                    </div>

                    <div
                      className={
                        "flex flex-row gap-2 px-2 pl-4 bounce-in " +
                        (activeTab == 0 ? "" : "hidden")
                      }
                    >
                      <label className="input input-bordered flex items-center bg-white">
                        <input
                          id="yearInput"
                          type="text"
                          className="w-1/2"
                          placeholder="Year"
                          maxLength={4}
                          onKeyPress={(e) => {
                            if (isNaN(parseInt(e.key))) e.preventDefault();
                          }}
                          onChange={checkIfFilterInputsNotEmpty}
                        />
                      </label>

                      <select
                        defaultValue={"Month"}
                        className="select select-bordered w-full max-w-xs bg-white"
                        id="monthSelect"
                        onChange={checkIfFilterInputsNotEmpty}
                      >
                        <option disabled>Month</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                    </div>
                    <div
                      className={"p-2 pl-4 " + (activeTab == 0 ? "" : "hidden")}
                    >
                      <button
                        onClick={handleFilter}
                        className={
                          "btn text-gray-600 w-full " +
                          (applyFilterEnabled ? "" : "btn-disabled")
                        }
                      >
                        Apply Filter
                      </button>
                      <div className="flex flex-row justify-center">
                        <button
                          onClick={handleClear}
                          className="btn w-2/3 font-normal mt-2  text-gray-500"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </ul>
                </aside>
                {/* SECTION SHOWING REVIEW PREVIEW CARDS */}
                <main className="flex flex-[2] flex-col gap-[.1rem]">
                  {activeTab === 0 ? (
                    <>
                      {/* ESTABLISHMENT REVIEW CARDS */}
                      {establishmentReviews.map((review, index) => {
                        return <ReviewCard key={index} review={review} />;
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
                      {/* FOOD ITEM CARDS */}
                      {foodItems.map((foodItem, index) => {
                        return (
                          <EFoodCard
                            foodItem={foodItem}
                            key={foodItem.id + index.toString()}
                          />
                        );
                      })}
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
