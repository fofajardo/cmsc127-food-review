import React from "react";
import { NavigationBar } from "../components/common/NavigationBar.tsx";
import { Footer } from "../components/common/Footer.tsx";

export function Home() {
  return (
    <div className="flex flex-col items-center">
      <NavigationBar />
      <div className="flex min-h-[86vh] max-w-[1080px] flex-1 flex-col items-stretch p-8">
        <p>sample</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
          temporibus, unde doloremque sit debitis vitae, autem dicta, in
          pariatur voluptate dolorem. Magnam fugit repellendus nobis et sequi
          quidem dolor dolore!
        </p>
      </div>
      <Footer />
    </div>
  );
}
