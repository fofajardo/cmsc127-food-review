import React, { useContext } from "react";
import { FiFilter } from "react-icons/fi";
import { FeedContext } from "../../pages/FeedPage";

export function EstablishmentFeedFilterCard() {
  const applyFilter = useContext(FeedContext).applyEstablishmentFilter;
  const handleFilterClick = () => {
    // get the values from the input fields
    let searchString = (
      document.getElementById("searchInput") as HTMLInputElement
    ).value;
    let rating = (document.getElementById("ratingSelect") as HTMLSelectElement)
      .value;
    let sortInput = (document.getElementById("sortSelect") as HTMLSelectElement)
      .value;
    // if default, set to empty string
    if (sortInput === "Sort by") sortInput = "";
    // process the rating input
    if (rating === "All (0-5 stars)") rating = "0";
    else if (rating === "High (4 stars or higher)") rating = "1";
    applyFilter(searchString, parseInt(rating), sortInput);
  };
  const handleClearClick = () => {
    // clear the input fields
    (document.getElementById("searchInput") as HTMLInputElement)!.value = "";
    (document.getElementById("ratingSelect") as HTMLInputElement)!.value =
      "All (0-5 stars)";
    (document.getElementById("sortSelect") as HTMLInputElement)!.value =
      "Sort by";
    applyFilter("", 0, "");
  };
  return (
    <>
      <div className="bounce-in card ml-4 mt-4 flex h-max max-h-80 w-80 bg-white shadow-lg">
        <div className="p-0">
          <div className="z-50 flex flex-col justify-between gap-3 p-6">
            <h2 className="text-elbitgreen w-full text-left text-2xl font-bold">
              <span className="flex flex-row items-center justify-start">
                <span className="line-clamp-1">Filter Results</span>
                <span className="flex flex-1 flex-row justify-end">
                  <FiFilter className="text-2xl" />
                </span>
              </span>
            </h2>
            <label className="input input-bordered flex items-center gap-2 bg-white">
              <input
                id="searchInput"
                type="text"
                className="grow "
                placeholder="Search"
              />
            </label>
            <select
              defaultValue={"Sort by"}
              className="select select-bordered w-full max-w-xs bg-white"
              id="ratingSelect"
            >
              <option disabled>Average Rating</option>
              <option>All (0-5 stars)</option>
              <option>High (4 stars or higher)</option>
            </select>
            <select
              defaultValue={"Sort by"}
              className="select select-bordered w-full max-w-xs bg-white"
              id="sortSelect"
            >
              <option disabled>Sort by</option>
              <option>Ascending Rating</option>
              <option>Descending Rating</option>
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
