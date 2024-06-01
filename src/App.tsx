import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/HomePage.tsx";
import { EstablishmentFeedPage } from "./pages/FeedPage.tsx";
import { Signup } from "./pages/SignUpPage.tsx";
import { Login } from "./pages/LoginPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<EstablishmentFeedPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
