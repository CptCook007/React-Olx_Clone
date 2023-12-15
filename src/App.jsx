import { useContext } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { AddProduct } from "./pages/Seller/AddProduct";
import UserContext from "./contexts/UserContext";
function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Routes>
        <Route
          path="/React-Olx_Clone
/"
          element={<Home />}
        />
        {user ? (
          <Route
            path="/React-Olx_Clone
          /user/add-product"
            element={<AddProduct />}
          />
        ) : (
          <Route
            path="/user/add-product"
            element={<Navigate to="/" replace />}
          />
        )}
      </Routes>
    </>
  );
}

export default App;
