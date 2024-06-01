import React from "react";
import { RatingStarIndicator } from "../common/RatingStarIndicator";

// @todo: pass props to the component to display the food item name, food description, and food rating
export function FFFoodCard({}: {}) {
  return (
    <>
      <div className="bounce-in productCard card w-[20.5rem] border-0 bg-white text-left shadow-xl transition-all duration-300 hover:cursor-pointer xl:hover:-translate-y-2">
        <figure>
          <div className="bg-secondary h-16 w-full rounded-none flex flex-col justify-center items-center text-white">
            <div className="flex flex-row w-full px-6 font-bold text-xl">
              <p className="line-clamp-1">Some Food Item Name</p>
            </div>
          </div>
        </figure>
        <div className="card-body gap-1 p-8 py-4 text-sm">
          {/* Food rating indicator */}
          <div className="card-actions justify-end">
            <p className="flex h-full flex-1 flex-col justify-center ">
              <span className="rounded-lg">Food Rating</span>
              <div className="ml-2">
                <RatingStarIndicator rating={3.2} />
              </div>
            </p>
          </div>
          <hr className="py-1" />
          {/* Food description preview */}
          <div className="card-actions justify-end">
            <p className="flex h-full flex-1 flex-col justify-center px-2 pb-1">
              <span className="line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                ipsa tempora tempore asperiores aspernatur laboriosam voluptatem
                recusandae quas. Alias ea omnis nisi optio blanditiis, delectus
                ratione necessitatibus accusantium cumque recusandae!
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
