import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserAuthContext from "../context/UserAuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserAuthContext);
  return (
    <div className="w-full h-[6rem]  bg-white p-6 shadow-slate-800 shadow-2xl flex justify-between">
      <div className="p-2 ">
        <h3 className=" w-full p-2 rounded-xl text-center  text-yellow-700 font-bold text-lg">
          {/* {userName} */}
          {user?.name}
        </h3>
      </div>
      <div className="flex w-full justify-end">
        <button
          onClick={() => {
            logout, navigate("/signin");
          }}
          className=" w-[15%] rounded-lg bg-red-400 text-white font-bold text-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
