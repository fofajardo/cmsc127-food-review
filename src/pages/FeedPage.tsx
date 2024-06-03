import React, { useEffect, useState } from "react";
import { NavigationBar } from "../components/common/NavigationBar.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { EFMockCard } from "../components/estab_feed/EFMockCard.tsx";
import { EstablishmentFeedFilterCard } from "../components/estab_feed/EFFilterCard.tsx";
import { EFEstablishmentCard } from "../components/estab_feed/EFEstablishmentCard.tsx";
import { FoodItemFeedFilterCard } from "../components/food_feed/FFFilterCard.tsx";
import { FFFoodCard } from "../components/food_feed/FFFoodCard.tsx";
import { EFExpandModal } from "../components/estab_feed/EFExpandModal.tsx";
import { FoodEstablishment, FoodItem } from "../../models/_models.js";
import { EFAddEstablishmentModal } from "../components/estab_feed/EFAddEstablishmentModal.tsx";
import axios from "axios";
import { apiUrls } from "../apiHelper.ts";

export const FeedContext = React.createContext({
  modalEstablishment: {} as FoodEstablishment,
  setModalEstablishment: (establishment: FoodEstablishment) => {},
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
  const [establishments, setEstablishments] = useState([] as FoodEstablishment[]);
  const [foodItems, setFoodItems] = useState([] as FoodItem[]);

  // upon render, fetch establishments and food items
  useEffect(() => {
    axios.get(apiUrls.foodEstablishments("?withRating=1")).then(function(aResponse) {
      setEstablishments(aResponse.data.data);
    });
    axios.get(apiUrls.foodItems("?full=1")).then(function(aResponse) {
      setFoodItems(aResponse.data.data);
    });
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
    // XXX(fofajardo): this should've been separated by col and order, NOT sort display string...
    let sortCol = "name";
    let sortOrder = "ASC";
    switch (sort) {
      case "Ascending Price":
        sortCol = "price";
        sortOrder = "ASC";
        break;
      case "Descending Price":
        sortCol = "price";
        sortOrder = "DESC";
        break;
      case "Alphabetical A-Z":
        sortCol = "fooditemname";
        sortOrder = "ASC";
        break;
      case "Alphabetical Z-A":
        sortCol = "fooditemname";
        sortOrder = "DESC";
        break;
      default:
        break;
    }

    axios.get(apiUrls.foodItems(
      `?establishmentId=${establishmentId}&name=${searchName}&foodType=${searchType}&sortCol=${sortCol}&sortOrder=${sortOrder}&full=1`)).then(function(aResponse) {
      setFoodItems(aResponse.data.data);
    });
    // use setFoodItems()
  };

  // toggle for showing establishment (false) or food items (true)
  const [toggle, setToggle] = useState(false);

  // state to store the establishment to be displayed in the modal
  const [modalEstablishment, setModalEstablishment] =
    useState({} as FoodEstablishment); // temporary

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
                    <p>Hello {window.localStorage.getItem("name")}</p>
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
