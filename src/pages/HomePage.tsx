import React from "react";
import { FaUtensils } from "react-icons/fa6";

export function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center bg-neutral h-[100vh] w-full">
        <div className="flex min-h-[86vh] max-w-[1080px] flex-1 flex-col justify-center items-stretch p-8">
          <div className="btnstyle1 flex flex-row text-4xl justify-center flex-nowrap items-center rounded-full mb-4 px-4 py-2  font-bold text-white hover:cursor-pointer ">
            <FaUtensils className="mr-2 text-2xl text-white" />
            FoodReview
          </div>
          <a href="/feed" className="btn btn-primary">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
