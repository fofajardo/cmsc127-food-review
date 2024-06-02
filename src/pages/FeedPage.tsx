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
import { FoodItem, sampleFoodItems } from "../models/FoodItem.ts";
import { EFAddEstablishmentModal } from "../components/estab_feed/EFAddEstablishmentModal.tsx";

export const FeedContext = React.createContext({
  modalEstablishment: sampleEstablishment,
  setModalEstablishment: (establishment: Establishment) => {},
  setToggle: (toggle: boolean) => {},
  applyEstablishmentFilter: (
    search: string,
    rating: number,
    sort: string
  ) => {},
  applyFoodItemFilter: (
    establishment: string,
    searchName: string,
    searchType: string,
    month: string, // "YYYY-MM"
    sort: string
  ) => {},
});

export function EstablishmentFeedPage() {
  const [establishments, setEstablishments] = useState([] as Establishment[]);
  const [foodItems, setFoodItems] = useState([] as FoodItem[]);

  // upon render, fetch establishments and food items
  useEffect(() => {
    // @TODO: fetch establishments and food items; remove the timeout, this is just simulated delay hehe
    setTimeout(() => {
      setEstablishments(sampleEstablishments);
      setFoodItems(sampleFoodItems);
    }, 500);
  }, []);

  // @TODO: implement filter logic
  const applyEstablishmentFilter = (
    search: string,
    rating: number, // 0:all or 1:high rating (4 above)
    sort: string // what kind of sort?
  ) => {
    // use setEstablishments()
  };
  // @TODO: implement filter logic
  const applyFoodItemFilter = (
    establishmentId: string,
    searchName: string,
    searchType: string,
    month: string, // "YYYY-MM"
    sort: string // what kind of sort?
  ) => {
    // use setFoodItems()
  };

  // toggle for showing establishment (false) or food items (true)
  const [toggle, setToggle] = useState(false);

  // state to store the establishment to be displayed in the modal
  const [modalEstablishment, setModalEstablishment] =
    useState(sampleEstablishment); // temporary

  return (
    <FeedContext.Provider
      value={{
        modalEstablishment,
        setModalEstablishment,
        setToggle,
        applyEstablishmentFilter,
        applyFoodItemFilter,
      }}
    >
      <div className="flex flex-col items-center">
        <EFExpandModal />
        <EFAddEstablishmentModal />
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
            <aside className=" sticky top-[5.5rem] h-max max-h-[90vh] flex-col self-start overflow-y-scroll rounded-xl pb-10 flex">
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
                <FoodItemFeedFilterCard />
              ) : (
                <>
                  <EstablishmentFeedFilterCard />
                  <div className="bounce-in flex flex-col ml-4 mt-4 card bg-white p-6 shadow-xl gap-2">
                    <h2 className="text-elbitgreen w-full text-left text-2xl font-bold">
                      <span className="flex flex-row items-center justify-start">
                        <span>Didn't find it?</span>
                      </span>
                    </h2>
                    <button
                      className="btn btn-neutral h-max min-h-0 p-3 text-white "
                      onClick={() => {
                        // open add establishment modal
                        const modal = document.getElementById(
                          "addEstablishmentModal"
                        );
                        if (modal) {
                          (modal as HTMLDialogElement).showModal();
                        }
                      }}
                    >
                      Add establishment
                    </button>
                    <p>Hello {window.localStorage.getItem("userName")}</p>
                  </div>
                </>
              )}
            </aside>
          </div>
        </div>
        <Footer />
      </div>
    </FeedContext.Provider>
  );
}
