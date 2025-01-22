import React, { useState } from "react";
import { axiosInstance } from "../utils/axiosConfig";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useDisableButton from "../hooks/useDisableButton";

const VerifyEmail = () => {
  const location = useLocation();
  const { buttonDisable, handleButtonDisablity, handleResetButton } =
    useDisableButton();
  const [verification, setVerification] = useState(false);
  const tokenFromUrl = location.pathname.split("/")[2];
  async function verifyEmailData() {
    handleButtonDisablity();
    try {
      const res = await axiosInstance.post(
        `api/auth/verifyUser/${tokenFromUrl}`
      );
      setVerification(true);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error);
    }
    handleResetButton();
  }
  return (
    <section className="bg-gray-500  w-full h-screen ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:h-[90vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Email Verification
            </h1>
            {verification ? (
              <div className="space-y-4 md:space-y-6 flex justify-center ">
                <div className=" p-4 text-white bg-primary-600 rounded-md w-[70%]">
                  Email Verification Completed
                </div>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6 flex justify-center ">
                <button
                  onClick={verifyEmailData}
                  disabled={buttonDisable}
                  className=" p-4 text-white bg-primary-600 rounded-md w-[50%]"
                >
                  Verify Email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
