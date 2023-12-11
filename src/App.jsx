import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { AddProduct } from "./pages/Seller/AddProduct";
export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUser(localStorage.getItem("username"));
    }
  }, []);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {user ? (
            <Route path="/user/add-product" element={<AddProduct />} />
          ) : (
            <Route
              path="/user/add-product"
              element={<Navigate to="/" replace />}
            />
          )}
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
