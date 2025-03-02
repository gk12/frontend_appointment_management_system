import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import UserAuthContext from "../context/UserAuthContext";
import useDisableButton from "../hooks/useDisableButton";
import { useSignin } from "../hooks/useSignin";
const signinValidation = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid Email"),
  password: Yup.string().required("Password is required").min(8).max(16),
});

const UserLoggedIn = (props) => {
  const { userType } = props;
  const { mutate, isLoading, isError, error, isSuccess, data } = useSignin();
  const navigate = useNavigate();
  const { loginUser } = useContext(UserAuthContext);
  const { buttonDisable, handleButtonDisablity, handleResetButton } =
    useDisableButton();

  const handleSubmit = async (values) => {
    handleButtonDisablity();
    console.log(values, "values");
    const { email, password } = values;
    try {
      mutate({ email, password, type: userType });
      console.log(error, isError, "error");
      if (isError) {
        toast.error(error.response.data);
      }
      if (data) {
        loginUser(data.user);
        toast.success("Logged in successfully");
        if (userType === "patient") {
          navigate("/patient/home");
        } else {
          navigate(`/${userType}/allAppointment`);
        }
      }
    } catch (error) {
      console.log(error, "error");
      // toast.error(error.response.data.message);
      // console.error(error.response.data.message);
    }
    handleResetButton();
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        type: userType,
      }}
      validationSchema={signinValidation}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <Field
            type="email"
            name="email"
            id="email"
            className={`bg-gray-50 border ${"border-gray-300"}  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="name@company.com"
          />
          <ErrorMessage name="email" component="div" className="text-red-600" />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <Field
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="••••••••"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-600"
          />
        </div>

        <button
          type="submit"
          disabled={buttonDisable}
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Signin
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <a
            href="/"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Register here
          </a>
        </p>
      </Form>
    </Formik>
  );
};

export default UserLoggedIn;
