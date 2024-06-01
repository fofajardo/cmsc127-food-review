import React from "react";

// Mock establishment card for the feed; shown when the product data is loading
export function EFMockCard({}: {}) {
  return (
    <>
      <div className="bounce-in productCard card w-[20.5rem] border-0 bg-white text-left shadow-xl transition-all duration-300 hover:cursor-pointer 2xl:hover:-translate-y-2">
        <figure>
          <div className="skeleton h-16 w-full rounded-none"></div>
        </figure>
        <div className="card-body gap-1 px-8 py-4 ">
          <h2 className="card-title skeleton h-4 w-1/2 rounded-lg"></h2>
          <p className="skeleton mt-1 h-3 w-3/4 rounded-lg"></p>
          <h2 className="card-title skeleton h-4 mt-2 w-1/2 rounded-lg"></h2>
          <p className="skeleton mt-1 h-3 w-3/4 rounded-lg"></p>
          <div className="card-actions mt-2 justify-end">
            <div className="skeleton h-12 w-full rounded-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
}
