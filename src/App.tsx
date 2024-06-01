import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/HomePage.tsx";
import { EstablishmentFeedPage } from "./pages/FeedPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<EstablishmentFeedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
