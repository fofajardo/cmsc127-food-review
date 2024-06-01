import React from "react";

// Mock product card for the customer feed; shown when the product data is loading
export function EFMockCard({}: {}) {
  return (
    <>
      <div className="bounce-in productCard card w-[20.5rem] border-0 bg-white text-left shadow-xl transition-all duration-300 hover:cursor-pointer 2xl:hover:-translate-y-2">
        <figure>
          <div className="skeleton h-[13.25rem] w-full rounded-none"></div>
        </figure>
        <div className="card-body gap-1 p-8">
          <h2 className="card-title skeleton h-6 w-1/2 rounded-lg"></h2>
          <p className="skeleton mt-1 h-6 w-full rounded-lg"></p>
          <div className="card-actions mt-5 justify-end">
            <p className="flex h-full flex-1 flex-col justify-center ">
              <span className="skeleton h-6 w-1/2 rounded-lg"></span>
              <span className="skeleton mt-1 h-4 w-1/2 rounded-lg"></span>
            </p>
            <div className="skeleton h-12 w-2/5 rounded-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
}
