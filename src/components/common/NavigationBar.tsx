import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { FaUtensils } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const openShoppingCartModal = () => {
  const dialog = document.getElementById("shoppingCartModal");
  if (dialog) {
    (dialog as HTMLDialogElement).showModal();
  }
};

export function NavigationBar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState<boolean>(true);

  // SCROLL EFFECT FOR NAVBAR
  // state to store the scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  // function to update scroll position
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  // effect to add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // @TODO: implement logout
  const handleLogOut = () => {};

  return (
    <>
      <div
        className={
          "sticky top-0 z-[100] flex w-full flex-1 justify-center shadow-xl backdrop-blur-2xl transition-all duration-300 " +
          (scrollPosition > 0 ? " rounded-b-xl" : "bg-neutral text-white ")
        }
      >
        <div className=" navbar max-w-[1080px] px-8 ">
          {/* TITLE SECTION */}
          <div className="flex-1 py-1">
            <a
              onClick={() => navigate("/feed")}
              className={
                "btnstyle1 flex flex-row flex-nowrap items-center rounded-full  px-4 py-2 text-2xl font-bold text-neutral hover:cursor-pointer " +
                (scrollPosition > 0
                  ? " bg-white bg-opacity-30"
                  : " text-white ")
              }
            >
              <FaUtensils className="mr-2 text-2xl" />
              FoodReview
            </a>
          </div>
          <div className={"flex-none "}>
            {/* USER PROFILE DROPDOWN */}
            {loggedIn ? (
              <div className="dropdown dropdown-end  ">
                <div
                  tabIndex={0}
                  role="button"
                  className={
                    "btnstyle1 avatar btn btn-circle btn-ghost transition-all duration-300" +
                    (scrollPosition > 0 ? " text-neutral" : " text-white ")
                  }
                >
                  <FiUser className={"text-2xl duration-0"} />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content menu-lg top-14 z-[1] mt-5 w-52 rounded-box bg-base-100 bg-opacity-95 p-2 text-black shadow-xl"
                >
                  <li>
                    <a
                      className="justify-between"
                      onClick={() => navigate("/feed")}
                    >
                      Back to feed
                    </a>
                  </li>
                  <li>
                    <a onClick={handleLogOut}>Logout</a>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
