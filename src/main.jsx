import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Menu from "./Screens/Menu.jsx";
import Navbar from "./Screens/Navbar.jsx";
import { BiRestaurant } from "react-icons/bi";
import Checkout from "./Screens/Checkout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
  },
  {
    path: "/Go_To_Menu",
    element: <Menu />,
  },
  {
    path: "/CheckOut",
    element: <Checkout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-blue-700 flex items-center py-2 gap-3 pl-3">
      <BiRestaurant className="text-3xl text-white" />
      <h2 className="text-white font-bold">Food's Restaurant</h2>
    </div>
    <RouterProvider router={router} />
  </React.StrictMode>
);
