import React, { useState } from "react";
import { NavigationBar } from "../components/common/NavigationBar.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { EFMockCard } from "../components/estab_feed/EFMockCard.tsx";
import { EstablishmentFeedFilterCard } from "../components/estab_feed/EFFilterCard.tsx";
import { EFEstablishmentCard } from "../components/estab_feed/EFEstablishmentCard.tsx";
import { FoodItemFeedFilterCard } from "../components/food_feed/FFFilterCard.tsx";

export function EstablishmentFeedPage() {
  // @ TODO: implement filter logic
  const applyFilter = () => {};

  // toggle for showing establishment (false) or food items (true)
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col items-center">
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
            {10 ? 10 + " results available." : "Fetching results..."}
          </div>
        </div>
        <div className="flex h-max flex-row">
          {/* Main section containing cards of previewed establishments */}
          <main className="flex min-h-[100vh] max-w-[1080px] flex-[2] basis-[2fr] flex-col items-stretch bg-base-100 p-4 px-0 lg:basis-[3fr]">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
              {/* @TODO: change this to a mapping function of fetched establishments */}
              {true ? (
                <>
                  <EFEstablishmentCard />
                  <EFEstablishmentCard />
                  <EFEstablishmentCard />
                  <EFEstablishmentCard />
                  <EFEstablishmentCard />
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
  );
}
