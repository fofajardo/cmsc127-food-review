import React, { useState } from "react";
import {
  NavigationBar,
  openShoppingCartModal,
} from "../components/common/NavigationBar.tsx";
import { Footer } from "../components/common/Footer.tsx";
import { FiFilter } from "react-icons/fi";
import { EFMockCard } from "../components/estab_feed/EFMockCard.tsx";
import { EstablishmentFeedFilterCard } from "../components/estab_feed/EFFilterCard.tsx";

export function EstablishmentFeedPage() {
  // PAGINATION LOGIC
  // original array of products
  const [originalProducts, setOriginalProducts] = useState([]);
  // active array of products (filtered)
  const [activeProducts, setActiveProducts] = useState(originalProducts);
  // max page number
  const [maxPage, setMaxPage] = useState(
    Math.ceil(originalProducts.length / 10)
  );
  // this stores the currently displayed products array
  const [currentPageProducts, setCurrentPageProducts] = useState(
    originalProducts.slice(0, 10)
  );
  // this stores the current page number
  const [page, setPage] = useState(1);
  // given a page number, return the products to be displayed
  const handleChangePage = (newPage: number) => {
    if (newPage > 0 && newPage <= maxPage) {
      setPage(newPage);
      const productsPerPage = 10;
      const start = (newPage - 1) * productsPerPage;
      const end = start + productsPerPage;
      setCurrentPageProducts(activeProducts.slice(start, end));
      // scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // @ TODO: implement filter logic
  const applyFilter = () => {};
  return (
    <div className="flex flex-col items-center">
      <NavigationBar />
      {/* MAIN CONTAINER*/}
      <div className="flex min-h-[86vh] w-full max-w-[1080px] flex-1 flex-col items-stretch p-8">
        <div className="flex flex-row flex-wrap items-center justify-between px-4 pt-6 text-left text-3xl font-medium ">
          <div className="line-clamp-1 h-min w-max">Browse Establishments:</div>
          <div className="line-clamp-1 w-max text-base font-normal text-neutral">
            {/* @TODO: make this conditional */}
            {10 ? 10 + " product listings available." : "Fetching products..."}
          </div>
        </div>
        <div className="flex h-max flex-row">
          {/* Main section containing cards of previewed products */}
          <main className="flex min-h-[100vh] max-w-[1080px] flex-[2] basis-[2fr] flex-col items-stretch bg-base-100 p-4 px-0 lg:basis-[3fr]">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
              {originalProducts.length ? (
                currentPageProducts.map((product) => {
                  return (
                    // <FeedProductCard
                    //   key={product._id}
                    //   product={product}
                    //   productCart={productCart}
                    //   setProductCart={setProductCart}
                    //   openExpandedProductModal={openExpandedProductModal}
                    //   setUserChangedProductCart={setUserChangedProductCart}
                    // />
                    <EFMockCard />
                  );
                })
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
            {/* Pagination buttons section */}
            <div className="pb-2 pt-8">
              <div className={"join " + (maxPage <= 1 ? "hidden" : "")}>
                <button
                  className={
                    "btn join-item " + (page > 1 ? "" : "btn-disabled")
                  }
                  onClick={() => {
                    handleChangePage(page - 1);
                  }}
                >
                  «
                </button>
                <div
                  className="btn join-item"
                  onClick={() => {
                    handleChangePage(page);
                  }}
                  about="Go to top"
                >
                  Page {page} of {maxPage}
                </div>
                <button
                  className={
                    "btn join-item " + (page === maxPage ? "btn-disabled" : "")
                  }
                  onClick={() => {
                    handleChangePage(page + 1);
                  }}
                >
                  »
                </button>
              </div>
            </div>
          </main>
          {/* (this section is hidden when screen is narrow (mobile)) */}
          <aside className=" sticky top-[5.5rem] mt-4 hidden h-max max-h-[90vh] flex-col self-start overflow-y-scroll rounded-xl pb-10 sm:flex">
            {/* Filter card */}
            <EstablishmentFeedFilterCard applyFilter={applyFilter} />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
