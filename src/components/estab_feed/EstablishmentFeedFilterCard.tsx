import React from "react";
import { FiFilter } from "react-icons/fi";

export function EstablishmentFeedFilterCard({
  applyFilter,
}: {
  applyFilter: (
    searchString: string,
    minPrice: number,
    maxPrice: number,
    sortType: string
  ) => void;
}) {
  const handleFilterClick = () => {
    const searchInput = (
      document.getElementById("searchInput") as HTMLInputElement
    ).value;
    const minPriceInput = parseInt(
      (document.getElementById("minPriceInput") as HTMLInputElement).value
    );
    const maxPriceInput = parseInt(
      (document.getElementById("maxPriceInput") as HTMLInputElement).value
    );
    let sortInput = (document.querySelector(".select") as HTMLSelectElement)
      .value;
    // if default, set to empty string
    if (sortInput === "Sort by") sortInput = "";
    applyFilter(searchInput, minPriceInput, maxPriceInput, sortInput);
  };
  const handleClearClick = () => {
    (document.getElementById("searchInput") as HTMLInputElement).value = "";
    (document.getElementById("minPriceInput") as HTMLInputElement).value = "";
    (document.getElementById("maxPriceInput") as HTMLInputElement).value = "";
    (document.querySelector(".select") as HTMLSelectElement).value = "Sort by";
    applyFilter("", 0, 0, "Sort by");
  };
  return (
    <>
      <div className="card ml-4 mt-4 flex h-max max-h-80 w-80 bg-white shadow-lg">
        <div className="p-0">
          <div className="z-50 flex flex-col justify-between gap-3 p-6">
            <h2 className="text-elbitgreen w-full text-left text-2xl font-bold">
              <span className="flex flex-row items-center justify-start">
                <span>Filter Results</span>
                <span className="flex flex-1 flex-row justify-end">
                  <FiFilter className="text-2xl" />
                </span>
              </span>
            </h2>
            <select
              defaultValue={"Sort by"}
              className="select select-bordered w-full max-w-xs bg-white"
            >
              <option disabled>Average Rating</option>
              <option>All (0-5 stars)</option>
              <option>High (4 stars or higher)</option>
            </select>
            <select
              defaultValue={"Sort by"}
              className="select select-bordered w-full max-w-xs bg-white"
            >
              <option disabled>Sort by</option>
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
