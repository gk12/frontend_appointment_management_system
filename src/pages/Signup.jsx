import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { axiosInstance } from "../utils/axiosConfig";
const signupValidation = Yup.object({
  name: Yup.string().required("Name is required").min(4).max(16),
  email: Yup.string().required("Email is required").email("Invalid email"),
  phone: Yup.number().required("Number is required").min(10).max(10),
  password: Yup.string().required("Password is required").min(8).max(16),
});
const Signup = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    // event.preventDefault();
    // Handle form submission logic here
    const { name, email, phone, password } = values;
    try {
      const response = await axiosInstance.post(`api/auth/authRegister`, {
        name,
        email,
        phone,
        password,
        type: "patient",
      });
      toast.success("Patient Registered successfully");
      navigate("/signin");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <section className="bg-gray-50  w-full h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:h-[90vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create an account
            </h1>
            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                password: "",
              }}
              validationSchema={signupValidation}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="adom"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600"
                  />
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your Number
                    </label>
                    <Field
                      type="number"
                      name="phone"
                      id="phone"
                      className={`bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder="1234567890"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
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
                    className={`bg-gray-50 border 
                      border-gray-300
                     text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="name@company.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className={`bg-gray-50 border border-gray-300
                     text-gray-900 text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 `}
                    placeholder="name@company.com"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="flex items-start"></div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/signin"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
