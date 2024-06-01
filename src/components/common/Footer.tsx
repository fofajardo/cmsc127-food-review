import React from "react";

export function Footer() {
  return (
    <footer className="flex w-full justify-center bg-neutral p-4 px-8 text-neutral-content">
      <div className="flex w-full max-w-[1080px] flex-col px-8 md:flex-row">
        <div className="flex flex-col">
          <p className="w-max text-lg font-bold">
            CMSC 127 ST-4L Final Project
          </p>
          <p>de Vega, Jerico Roen B.</p>
          <p>Ramil, Precious</p>
          <p>Fajardo, Francis</p>
        </div>
        <div className="mt-4 flex w-full flex-row md:mt-0 md:justify-end">
          <p className="underline">Copyright © 2024 - All right reserved</p>
        </div>
      </div>
    </footer>
  );
}
