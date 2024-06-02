import React, { useEffect, useContext } from "react";
import { FiFilter } from "react-icons/fi";
import { FeedContext } from "../../pages/FeedPage";

export function FoodItemFeedFilterCard() {
  const applyFilter = useContext(FeedContext).applyFoodItemFilter;
  const handleFilterClick = () => {
    // get the values from the input fields
    let searchString = (
      document.getElementById("foodSearchInput") as HTMLInputElement
    ).value;
    let rating = (
      document.getElementById("foodRatingSelect") as HTMLSelectElement
    ).value;
    let sortInput = (
      document.getElementById("foodSortSelect") as HTMLSelectElement
    ).value;
    // if default, set to empty string
    if (sortInput === "Sort by") sortInput = "";
    // process the rating input
    if (rating === "All (0-5 stars)") rating = "0";
    else if (rating === "High (4 stars or higher)") rating = "1";
  };
  const handleClearClick = () => {
    // clear the input fields
    (document.getElementById(
      "foodEstablishmentIDInput"
    ) as HTMLInputElement)!.value = "";
    (document.getElementById("foodSearchInput") as HTMLInputElement)!.value =
      "";
    (document.getElementById("foodYearInput") as HTMLInputElement)!.value = "";
    (document.getElementById("foodMonthSelect") as HTMLSelectElement)!.value =
      "Month";
    (document.getElementById("foodSortSelect") as HTMLSelectElement)!.value =
      "Sort by";
    applyFilter("", "", "", "");
  };

  // upon load, check URL if there is provided establishment ID
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const establishmentId = urlParams.get("establishmentid");
    console.log("establishmentId", establishmentId);
    if (establishmentId) {
      // set the establishment ID input field
      (
        document.getElementById("foodEstablishmentIDInput") as HTMLInputElement
      ).value = establishmentId;
    }
  }, []);
  return (
    <>
      <div className="bounce-in card ml-4 mt-4 flex h-max w-80 bg-white shadow-lg">
        <div className="p-0">
          <div className="z-50 flex flex-col justify-between gap-3 p-6">
            <h2 className="text-elbitgreen w-full text-left text-2xl font-bold">
              <span className="flex flex-row items-center justify-start">
                <span>Filter Food Items</span>
                <span className="flex flex-1 flex-row justify-end">
                  <FiFilter className="text-2xl" />
                </span>
              </span>
            </h2>
            <label className="input input-bordered flex items-center gap-2 bg-white">
              <input
                id="foodEstablishmentIDInput"
                type="text"
                className="grow "
                placeholder="Enter Establishment ID"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-white">
              <input
                id="foodSearchInput"
                type="text"
                className="grow "
                placeholder="Search"
              />
            </label>
            <div className="flex flex-row gap-2">
              <label className="input input-bordered flex items-center bg-white">
                <input
                  id="foodYearInput"
                  type="text"
                  className="w-1/2"
                  placeholder="Year"
                  maxLength={4}
                  onKeyPress={(e) => {
                    if (isNaN(parseInt(e.key))) e.preventDefault();
                  }}
                />
              </label>

              <select
                defaultValue={"Month"}
                className="select select-bordered w-full max-w-xs bg-white"
                id="foodMonthSelect"
              >
                <option disabled>Month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>

            {/* <select
              defaultValue={"Sort by"}
              className="select select-bordered w-full max-w-xs bg-white"
              id="foodRatingSelect"
            >
              <option disabled>Average Rating</option>
              <option>All (0-5 stars)</option>
              <option>High (4 stars or higher)</option>
            </select> */}
            <select
              defaultValue={"Sort by"}
              className="select select-bordered w-full max-w-xs bg-white"
              id="foodSortSelect"
            >
              <option disabled>Sort by</option>
              <option>Ascending Price</option>
              <option>Descending Price</option>
              <option>Alphabetical A-Z</option>
              <option>Alphabetical Z-A</option>
            </select>
            <div className="card-actions mt-2 flex w-full flex-row justify-center">
              <button
                className="btn btn-neutral h-max min-h-0 p-3 text-white "
                onClick={() => {
                  handleFilterClick();
                }}
              >
                Apply Filter
              </button>
              <button
                className="btn h-max min-h-0 p-3 font-normal"
                onClick={() => {
                  handleClearClick();
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
