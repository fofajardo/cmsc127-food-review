import React from "react";
import { FiFilter } from "react-icons/fi";

export function FIFilterCard({
  applyFoodReviewFilter,
}: {
  applyFoodReviewFilter: (month: string, sortInput: string) => void;
}) {
  const handleFilterClick = () => {
    // get the values from the input fields
    let year = (document.getElementById("foodYearInput") as HTMLInputElement)
      .value;
    let month = (
      document.getElementById("foodMonthSelect") as HTMLSelectElement
    ).value;
    // combine year and month into "YYYY-MM"
    if (year && month) year = year + "-" + month;
    let sortInput = (
      document.getElementById("foodSortSelect") as HTMLSelectElement
    ).value;
    // if default, set to empty string
    if (sortInput === "Sort by") sortInput = "";
    // // process the rating input
    // if (rating === "All (0-5 stars)") rating = "0";
    // else if (rating === "High (4 stars or higher)") rating = "1";
    applyFoodReviewFilter(year, sortInput);
  };
  const handleClearClick = () => {
    // clear the input fields

    (document.getElementById("foodYearInput") as HTMLInputElement)!.value = "";
    (document.getElementById("foodMonthSelect") as HTMLSelectElement)!.value =
      "Month";
    (document.getElementById("foodSortSelect") as HTMLSelectElement)!.value =
      "Sort by";
    applyFoodReviewFilter("", "");
  };
  return (
    <>
      <div className="bounce-in card flex h-max w-80 bg-white shadow-lg border-[0.1px]">
        <div className="p-0">
          <div className="z-50 flex flex-col justify-between gap-3 p-6">
            <h2 className="text-elbitgreen w-full text-left text-2xl font-bold">
              <span className="flex flex-row items-center justify-start">
                <span>Filter Reviews </span>
                <span className="flex flex-1 flex-row justify-end">
                  <FiFilter className="text-2xl" />
                </span>
              </span>
            </h2>

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
              <option>Ascending Rating</option>
              <option>Descending Rating</option>
              <option>Newest</option>
              <option>Oldest</option>
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
