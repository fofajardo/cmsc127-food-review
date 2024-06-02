import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { EstablishmentFeedPage } from "./pages/FeedPage.tsx";
import { Signup } from "./pages/SignUpPage.tsx";
import { Login } from "./pages/LoginPage.tsx";
import { EstablishmentPage } from "./pages/EstablishmentPage.tsx";
import { FoodItemPage } from "./pages/FoodItemPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { User } from "./models/User.ts";

export interface UserContextValue {
  user: User | undefined;
  setUser: (user: User) => void;
}

// context for determining user information
export const UserContext = React.createContext<UserContextValue>({
  user: {} as User,
  setUser: () => {},
});

function App() {
  const [user, setUser] = React.useState<User | undefined>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<EstablishmentFeedPage />} />
          <Route path="/establishment" element={<EstablishmentPage />} />
          <Route path="/fooditem" element={<FoodItemPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
