import React, { useState } from "react";
import { NavigationBar } from "../components/common/NavigationBar.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { IoLocationSharp } from "react-icons/io5";
import { RatingStarIndicator } from "../components/common/RatingStarIndicator.tsx";
import { sampleEstablishment } from "../models/Establishment.ts";

export function EstablishmentPage() {
  const [establishment, setEstablishments] = useState(sampleEstablishment);
  return (
    <div className="flex flex-col items-center">
      <NavigationBar />
      <div className="flex min-h-[86vh] w-full max-w-[1080px] flex-1 flex-col items-stretch p-8">
        <div className="card bg-white shadow-xl my-8 flex flex-col">
          <div className={"card-body gap-0 pt-6"}>
            <div
              className="flex-row flex items-center text-lg gap-1 text-primary-content
            "
            >
              <IoLocationSharp className="text-xs" />
              <p className="text-sm">{establishment.location}</p>
            </div>

            <div className="flex flex-row justify-between items-start">
              <h2 className="text-left text-3xl font-bold">
                {establishment.name}
              </h2>
              <div className="flex flex-col justify-between">
                <div className="card-actions flex-col">
                  <RatingStarIndicator rating={establishment.average_rating} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
