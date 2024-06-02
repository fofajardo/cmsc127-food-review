import React, { useState } from "react";
import { NavigationBar } from "../components/common/NavigationBar.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { IoLocationSharp } from "react-icons/io5";
import { RatingStarIndicator } from "../components/common/RatingStarIndicator.tsx";
import { sampleEstablishment } from "../models/Establishment.ts";
import { MdCheckCircleOutline, MdOutlineContentCopy } from "react-icons/md";

export function EstablishmentPage() {
  const [establishment, setEstablishments] = useState(sampleEstablishment);
  const [activeTab, setActiveTab] = useState(0);

  // this is for keeping track of the copy id state
  const [copied, setCopied] = React.useState(false);
  return (
    <div className="flex flex-col items-center">
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
            <p className="indent-8 pt-4">{establishment.description}</p>

            <p className="text-sm text-gray-500 inline-flex items-center justify-end">
              Establishment ID:{" "}
              <span className="ml-1">
                {establishment.food_establishment_id}
              </span>
              {/* render copy icon conditionally; initially a copy icon, then a checked icon upon clicking (for 5 seconds) */}
              {copied ? (
                <MdCheckCircleOutline className="ml-1 text-base" />
              ) : (
                <MdOutlineContentCopy
                  onClick={() => {
                    // copy establishment id to clipboard
                    navigator.clipboard.writeText(
                      establishment.food_establishment_id
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
            {/* BOTTOM PANEL */}
            <div className="card flex min-h-[60vh] w-full flex-row rounded-xl bg-yellow-50 shadow-lg mt-4">
              <aside className="flex-1">
                {/* SIDE TABS */}
                <ul className="menu h-full rounded-l-xl border-b-[0.01rem] border-r-[.01rem] border-extragray4 py-4 pr-4 sm:border-b-0">
                  <li>
                    <h2 className="menu-title text-xl text-neutral">
                      Your orders
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
                </ul>
              </aside>
              {/* SECTION SHOWING REVIEW PREVIEW CARDS */}
              <main className="flex flex-[2] flex-col gap-[.1rem]"></main>
            </div>
            {/*!!! REMOVE THIS BEFORE SUBMISSION this is just for testing */}
            <button
              className="btn btn-primary mt-8"
              onClick={() => {
                // get the query string from the URL
                const queryString = window.location.search;
                // get the establishment ID from the query string
                const urlParams = new URLSearchParams(queryString);
                const establishmentId = urlParams.get("id");
                // print the establishment ID
                alert(establishmentId);
              }}
            >
              Print establishment ID from URL
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
