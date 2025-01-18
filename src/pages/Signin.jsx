import React, { useState } from "react";
import UserLoggedIn from "../components/UserLoggedIn";

const Signin = () => {
  const [userType, SetUserType] = useState(null);

  return (
    <section className="bg-gray-500  w-full h-screen ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:h-[90vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              {"patient".match(userType)
                ? "Create Appointment"
                : "Access an account"}
            </h1>
            {!userType ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => SetUserType("patient")}
                  className="w-[8rem] border-2 border-black h-[3rem] rounded-md text-center p-2 text-white bg-gray-900 font-bold"
                >
                  Patient
                </button>
                <button
                  onClick={() => SetUserType("doctor")}
                  className="w-[8rem] border-2 border-black h-[3rem] rounded-md text-center p-2 text-white bg-gray-900 font-bold"
                >
                  Doctor
                </button>
                <button
                  onClick={() => SetUserType("admin")}
                  className="w-[8rem] border-2 border-black h-[3rem] rounded-md text-center p-2 text-white bg-gray-900 font-bold"
                >
                  Admin
                </button>
              </div>
            ) : (
              <UserLoggedIn userType={userType} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
