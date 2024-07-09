import React from "react";
import { BiRestaurant } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="max-w-[350px] ml-[40%] mt-52 text-center">
        <h1 className="text-4xl ">Welcome to Food's Kitchen</h1>
        <Link to="/Go_To_Menu">
          <button className="uppercase bg-blue-800 text-white px-2 rounded-lg py-1 mt-5">
            Go TO menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
