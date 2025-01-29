import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  emailRegExp,
  passwordRegExp,
  phoneRegExp,
} from "../../utils/validateWithRegax";
import useDisableButton from "../../hooks/useDisableButton";

const addDoctorFormValidation = Yup.object({
  name: Yup.string().required("Name required").min(6).max(15),
  email: Yup.string().required("Email required").matches(emailRegExp),
  phone: Yup.string().required("Phone required").matches(phoneRegExp),
  specialty: Yup.string().required("Specialty required"),
  region: Yup.string().required("Region required"),
  qualification: Yup.string().required("qualification required"),
  yearOfExp: Yup.number().required("yearOfExp required").min(0),
  password: Yup.string().required("Password required").matches(passwordRegExp),
});
const DoctorsList = () => {
  const navigate = useNavigate();
  const [toggleModel, setToggleModel] = useState(false);
  const [doctorsList, setDoctorsList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { handleButtonDisablity, handleResetButton, buttonDisable } =
    useDisableButton();
  // post api add Doctors here
  const handleSubmit = async (values) => {
    console.log(values, "values");
    handleButtonDisablity();
    const {
      name,
      email,
      phone,
      specialty,
      region,
      qualification,
      yearOfExp,
      password,
    } = values;
    try {
      const doctorsData = await axiosInstance.post("api/admin/addDoctor", {
        name,
        email,
        phone,
        specialty,
        region,
        qualification,
        yearOfExp,
        type: "Doctor",
        password,
      });
      setToggleModel(false);
      toast.success("Doctor added successfully");
    } catch (error) {
      toast.error(error.response.data.error, "failed to add");
      console.log(error, "error value");
      setToggleModel(true);
    }
    fetchData(currentPage);
    handleResetButton();
  };

  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      fetchData(pageNo);
      setCurrentPage(pageNo);
    }
  };
  const fetchData = async (pageNo) => {
    try {
      const response = await axiosInstance.get(
        `api/admin/showDoctors/?pageNo=${pageNo}`
      );
      console.log("response--", response.data);
      setDoctorsList(response.data.doctors);
      setTotalPages(response.data.noOfPages);
    } catch (err) {
      console.log(err);
      toast.error("Error while Fetching Data");
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  function showDoctorsDetails(id) {
    navigate(`/admin/doctorDetails/${id}`);
    console.log(id, "abcd");
  }
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-[30%]  ">
              <div className="flex flex-grow">
                <h1 className="font-bold text-3xl">Doctors</h1>
              </div>
              <div className="flex justify-end ">
                <button
                  onClick={() => setToggleModel(true)}
                  className="bg-blue-600 rounded-md px-4 py-2 text-white"
                >
                  ADD
                </button>
              </div>
              {toggleModel && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                  <div className="w-[40%] max-w-lg bg-white p-6  rounded-md flex flex-col">
                    <h2 className="text-xl font-semibold text-center mb-4">
                      Add Doctor
                    </h2>

                    <Formik
                      initialValues={{
                        name: "",
                        email: "",
                        phone: "",
                        specialty: "",
                        region: "",
                        qualification: "",
                        yearOfExp: "",
                        password: "",
                      }}
                      validationSchema={addDoctorFormValidation}
                      onSubmit={handleSubmit}
                    >
                      <Form className="space-y-1">
                        <div>
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Region
                          </label>
                          <Field
                            as="select"
                            id="region"
                            name="region"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="">Select</option>
                            <option value="Northeast">Northeast</option>
                            <option value="Midwest">Midwest</option>
                            <option value="South">South</option>
                            <option value="West">West</option>
                            <option value="Southeast">Southeast</option>
                            <option value="PacificNorthwest">
                              Pacific Northwest
                            </option>
                            <option value="GreatPlains">Great Plains</option>
                            <option value="RockyMountainRegion">
                              Rocky Mountain Region
                            </option>
                          </Field>
                        </div>

                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="specialty"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Specialty
                          </label>
                          <Field
                            as="select"
                            id="specialty"
                            name="specialty"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="">Select</option>
                            <option value="CognitiveBehavioralTherapy(CBT)">
                              Cognitive Behavioral Therapy (CBT)
                            </option>
                            <option value="TraumaTherapy">
                              Trauma Therapy
                            </option>
                            <option value="MarriageandFamilyTherapy(MFT)">
                              Marriage and Family Therapy (MFT)
                            </option>
                            <option value="BehaviorTherapy(DBT)">
                              Behavior Therapy (DBT)
                            </option>
                          </Field>
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="qualification"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Qualifications
                          </label>
                          <Field
                            type="text"
                            id="qualification"
                            name="qualification"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="qualification"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="yearOfExp"
                            className="block text-sm font-medium text-gray-700"
                          >
                            yearOfExp
                          </label>
                          <Field
                            type="number"
                            id="yearOfExp"
                            name="yearOfExp"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="yearOfExp"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone Number
                          </label>
                          <Field
                            type="tel"
                            id="phone"
                            name="phone"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <Field
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="flex justify-end mt-4">
                          <button
                            type="submit"
                            disabled={buttonDisable}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            onClick={() => setToggleModel(false)}
                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                          >
                            Close
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              )}
              <table className="w-full table-auto">
                <thead>
                  <tr className="h-10">
                    <th className="font-bold p-2 text-left">sr no</th>
                    <th className="font-bold p-2 text-left">Name</th>
                    <th className="font-bold p-2 text-left">Email</th>
                    <th className="font-bold p-2 text-left">Specialty</th>
                    <th className="font-bold p-2 text-left">Qualifications</th>
                    <th className="font-bold p-2 text-left">YearOfExp</th>
                    <th className="font-bold p-2 text-left">Phone</th>
                    <th className="font-bold p-2 text-left">Region</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorsList.map((data, index) => (
                    <tr
                      key={data._id}
                      className="border-t cursor-pointer hover:bg-slate-200"
                      onClick={() => showDoctorsDetails(data._id)}
                    >
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{data.name}</td>
                      <td className="p-2">{data.email}</td>
                      <td className="p-2">{data.specialty}</td>
                      <td className="p-2">
                        {data.qualification.toUpperCase()}
                      </td>
                      <td className="p-2">{data.yearOfExp}</td>
                      <td className="p-2">{data.phone}</td>
                      <td className="p-2">{data.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
