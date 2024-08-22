import React from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutGrid } from "react-icons/lu";

const Sidebar = () => {
  return (
    <div className="absolute top-[90px] left-[15px] w-[180px] pt-8">
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-lg font-medium ${
                isActive ? "text-purple-600" : "text-gray-700"
              } `
            }
          >
            <LuLayoutGrid
              className={({ isActive }) =>
                `bg-white ${isActive ? "bg-purple-500" : "bg-white"}`
              }
            />
            <span>Overview</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/people"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-lg font-medium ${
                isActive ? "text-purple-600" : "text-gray-700"
              } hover:text-purple-600`
            }
          >
            <LuLayoutGrid className="text-lg" />
            <span>People Directory</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
