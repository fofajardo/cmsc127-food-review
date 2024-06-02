import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { EstablishmentFeedPage } from "./pages/FeedPage.tsx";
import { Signup } from "./pages/SignUpPage.tsx";
import { Login } from "./pages/LoginPage.tsx";
import { EstablishmentPage } from "./pages/EstablishmentPage.tsx";
import { FoodItemPage } from "./pages/FoodItemPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/feed" element={<EstablishmentFeedPage />} />
        <Route path="/establishment" element={<EstablishmentPage />} />
        <Route path="/fooditem" element={<FoodItemPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
