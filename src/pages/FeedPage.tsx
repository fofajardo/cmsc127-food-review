import React, { useEffect, useState } from "react";
import { NavigationBar } from "../components/common/NavigationBar.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { EFMockCard } from "../components/estab_feed/EFMockCard.tsx";
import { EstablishmentFeedFilterCard } from "../components/estab_feed/EFFilterCard.tsx";
import { EFEstablishmentCard } from "../components/estab_feed/EFEstablishmentCard.tsx";
import { FoodItemFeedFilterCard } from "../components/food_feed/FFFilterCard.tsx";
import { FFFoodCard } from "../components/food_feed/FFFoodCard.tsx";
import { EFExpandModal } from "../components/estab_feed/EFExpandModal.tsx";
import {
  Establishment,
  sampleEstablishment,
  sampleEstablishments,
} from "../models/Establishment.ts";
import {
  FoodItem,
  sampleFoodItem,
  sampleFoodItems,
} from "../models/FoodItem.ts";

export const FeedContext = React.createContext({
  modalEstablishment: sampleEstablishment,
  setModalEstablishment: (establishment: Establishment) => {},
});

export function EstablishmentFeedPage() {
  const [establishments, setEstablishments] = useState([] as Establishment[]);
  const [foodItems, setFoodItems] = useState([] as FoodItem[]);

  // upon render, fetch establishments and food items
  useEffect(() => {}, [
    // @TODO: fetch establishments and food items; remove the timeout, this is just simulated delay hehe
    setTimeout(() => {
      setEstablishments(sampleEstablishments);
      setFoodItems(sampleFoodItems);
    }, 500),
  ]);

  // @ TODO: implement filter logic
  const applyFilter = () => {};

  // toggle for showing establishment (false) or food items (true)
  const [toggle, setToggle] = useState(false);

  // state to store the establishment to be displayed in the modal
  const [modalEstablishment, setModalEstablishment] =
    useState(sampleEstablishment); // temporary

  return (
    <FeedContext.Provider value={{ modalEstablishment, setModalEstablishment }}>
      <div className="flex flex-col items-center">
        <EFExpandModal />
        <NavigationBar />
        {/* MAIN CONTAINER*/}
        <div className="flex min-h-[86vh] w-full max-w-[1080px] flex-1 flex-col items-stretch p-8">
          <div className="flex flex-row flex-wrap items-center justify-between px-4 pt-6 text-left text-3xl font-medium ">
            <div className="line-clamp-1 h-min w-max flex flex-row items-center">
              <span className="mr-3">
                Browse {toggle ? " Food Items" : "Establishments"}
              </span>
            </div>
            <div className="line-clamp-1 w-max text-base font-normal text-neutral">
              {/* @TODO: make this conditional */}
              {toggle ? "Showing all food items" : "Showing all establishments"}
            </div>
          </div>
          <div className="flex h-max flex-row">
            {/* MAIN SECTION */}
            <main className="flex min-h-[100vh] max-w-[1080px] flex-[2] basis-[2fr] flex-col items-stretch bg-base-100 p-4 px-0 lg:basis-[3fr]">
              <div
                className={
                  "grid grid-cols-1 gap-6 lg:grid-cols-2 " +
                  (toggle ? "hidden" : "")
                }
              >
                {/* map the establishments into preview cards */}
                {establishments.length ? (
                  <>
                    {establishments.map((establishment, index) => (
                      <EFEstablishmentCard
                        key={index + establishment.name}
                        establishment={establishment}
                      />
                    ))}
                  </>
                ) : (
                  // display mock cards to signify loading
                  <>
                    <EFMockCard />
                    <EFMockCard />
                    <EFMockCard />
                    <EFMockCard />
                  </>
                )}
              </div>
              <div
                className={
                  "grid grid-cols-1 gap-6 lg:grid-cols-2 " +
                  (!toggle ? "hidden" : "")
                }
              >
                {foodItems ? (
                  <>
                    {foodItems.map((foodItem, index) => (
                      <FFFoodCard
                        key={index + foodItem.name}
                        foodItem={foodItem}
                      />
                    ))}
                  </>
                ) : (
                  // display mock cards to signify loading
                  <>
                    <EFMockCard />
                    <EFMockCard />
                    <EFMockCard />
                    <EFMockCard />
                  </>
                )}
              </div>
            </main>
            {/* (this section is hidden when screen is narrow (mobile)) */}
            <aside className=" sticky top-[5.5rem] hidden h-max max-h-[90vh] flex-col self-start overflow-y-scroll rounded-xl pb-10 sm:flex">
              <div className="card ml-4 mt-4">
                <div className="join">
                  <button
                    className={
                      "join-item btn text-white text-xl " +
                      (!toggle ? "bg-neutral hover:bg-neutral" : "")
                    }
                    onClick={() => setToggle(false)}
                  >
                    Establishments
                  </button>
                  <button
                    className={
                      "join-item btn text-white text-xl " +
                      (toggle ? "bg-neutral hover:bg-neutral" : "")
                    }
                    onClick={() => setToggle(true)}
                  >
                    Food Items
                  </button>
                </div>
              </div>
              {/* Filter card */}
              {toggle ? (
                <FoodItemFeedFilterCard applyFilter={applyFilter} />
              ) : (
                <EstablishmentFeedFilterCard applyFilter={applyFilter} />
              )}
            </aside>
          </div>
        </div>
        <Footer />
      </div>
    </FeedContext.Provider>
  );
}
