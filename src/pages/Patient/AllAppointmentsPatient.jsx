import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import PatientDashboardCalendar from "../../components/PatientDashboardCalendar";
import { TiTick } from "react-icons/ti";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { emailRegExp, phoneRegExp } from "../../utils/validateWithRegax";
import { ErrorBoundary } from "react-error-boundary";
import { addDays } from "date-fns";
import useDisableButton from "../../hooks/useDisableButton";
const validateBookAppointmentForm = Yup.object({
  name: Yup.string().min(6).max(16),
  email: Yup.string().required("Email is required").matches(emailRegExp),
  phone: Yup.string().required("Phone Number is required").matches(phoneRegExp),
});

const AllAppointmentsPatient = () => {
  const [availabilityData, setAvailabilityData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingBookAppointment, setLoadingBookAppointment] = useState(false);
  const [specialtyAndRegion, setSpecialtyAndRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [minDate, setMinDate] = useState("");
  const [selectedSpecialty, setSelectSpecialty] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataFound, setDataFound] = useState(false);
  const [toggleModel, setToggleModel] = useState("");

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [colorForCompletedMonth, setColorCompletedMonth] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedData, setSelectedData] = useState(null);
  const [appointmentType, setAppointmentType] = useState("all");
  const warningRef = useRef();
  const [currentMonthData, setCurrentMonthData] = useState(
    currentDate.getMonth()
  );
  const { handleButtonDisablity, handleResetButton, buttonDisable } =
    useDisableButton();
  function dayDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.toLocaleString("en-US", { weekday: "long" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    return (
      day.slice(0, 3) + "," + month.slice(0, 3) + " " + dayOfMonth + "," + year
    );
  }

  const fetchDropdownData = async () => {
    try {
      const response = await axiosInstance.get(
        "api/patient/showSpecialityAndRegion"
      );
      console.log(
        response.data.showSpecialtyAndRegion,
        "response data value11"
      );
      setSpecialtyAndRegion(response.data.showSpecialtyAndRegion || []);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  const TherapistAvailability = async (pageNo) => {
    setIsLoading(true);
    setAvailabilityData(null);

    try {
      const response = await axiosInstance.get(
        `api/patient/showAppointmentAvailability?pageNo=${pageNo}&appointmentType=${appointmentType}&specialty=${selectedSpecialty}&region=${selectedRegion}&date=${selectedDate}&month=${currentMonth}`
      );
      setAvailabilityData(response.data.appointmentsData);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
      setDataFound(response.data.appointmentData.length === 0);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  function searchButton() {
    if (selectedRegion || appointmentType) {
      TherapistAvailability(currentPage);
    } else {
      toast.error("Add key to Search Data");
    }
  }
  useEffect(() => {
    fetchDropdownData();
    const currentDate = new Date().toISOString().split("T")[0];
    setMinDate(currentDate);
    TherapistAvailability(currentPage);
  }, [currentMonth, selectedDate]);

  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      TherapistAvailability(pageNo);
      setCurrentPage(pageNo);
    }
  };

  const handleDateSelect = (date) => {
    console.log(date, "date is---------=============");
    setSelectedDate(date);
  };

  function showMonth(month) {
    const monthVal = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthVal[(month + 12) % 12];
  }

  async function handleBookAppointment(values) {
    handleButtonDisablity();
    const { name, email, phone } = values;
    console.log({ name, email, phone });
    setLoadingBookAppointment(true);
    try {
      const requestBody = {
        id: selectedData.selectedItemId,
        name: name,
        email: email,
        phone: phone,
      };
      const response = await axiosInstance.post(
        "api/patient/bookAppointment",
        requestBody
      );
      if (response.status === 201) {
        toast.success("Appointment booked successfully!");
      } else {
        toast.error("Failed to book the appointment.");
      }
      setLoadingBookAppointment(false);
      TherapistAvailability(currentPage);
      setToggleModel(false);
    } catch (error) {
      toast.error(error);
    }
    handleResetButton();
  }
  const validatedMonth = () => {
    setCurrentMonth((prev) => {
      // Get the current date and extract the current year and month
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      // Calculate the new date by subtracting 30 days
      const newDate = addDays(prev, -30);

      // Check if the new date is from a completed month (before the current month)
      const isCompletedMonth =
        newDate.getFullYear() === currentYear &&
        newDate.getMonth() < currentMonth;

      if (isCompletedMonth) {
        if (!warningRef.current) {
          toast.warning(
            "Please select a valid month, Don't select completed month."
          );
          setColorCompletedMonth(true);
          warningRef.current = true;
        }
        return prev;
      } else {
        warningRef.current = false;
        return newDate;
      }
    });
  };
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-full">
              <div className="w-full h-8  ">
                <h1 className="text-gray-600 font-extrabold text-4xl">
                  Schedule Appointment
                </h1>
              </div>
              <div className="w-full p-2 flex items-center space-x-4 ">
                <label htmlFor="region" className="text-black font-bold">
                  Region
                </label>
                <select
                  className="w-[15%] h-[2rem] bg-slate-300 rounded-md pl-4"
                  value={selectedRegion}
                  id="region"
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {/* <option value="" disabled>
                    Region
                  </option> */}
                  <option value="all">All</option>
                  {specialtyAndRegion?.map((data, index) => (
                    <option key={index} value={data.region}>
                      {data.region}
                    </option>
                  ))}
                </select>

                <label htmlFor="region" className="text-black font-bold">
                  Specialty
                </label>
                <select
                  className="w-[15%] h-[2rem] bg-slate-300 rounded-md pl-4"
                  value={selectedSpecialty}
                  id="specialty"
                  onChange={(e) => setSelectSpecialty(e.target.value)}
                >
                  <option value="all">All</option>
                  {specialtyAndRegion?.map((data, index) => (
                    <option key={index} value={data.specialty}>
                      {data.specialty}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="appointmentType"
                  className="text-black font-bold"
                >
                  Appointment Type
                </label>
                <select
                  id="appointmentType"
                  name="appointmentType"
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="w-[15%] h-[2rem] bg-slate-300 rounded-md pl-4"
                >
                  {/* <option value="" disabled>
                    Appointment Type
                  </option> */}
                  <option value="all">All</option>
                  <option value="Consultation(45min)">
                    Consultation (45min)
                  </option>
                  <option value="Follow-up(30min)">Follow-up (30min)</option>
                </select>
                <div className="flex justify-end">
                  <button
                    onClick={() => searchButton()}
                    className="ml-auto h-[2rem] bg-blue-500 text-white rounded-md px-4"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="w-full   flex">
                <div className="w-[35%]   h-auto">
                  <h2 className="font-medium text-center text-gray-600 text-xl">
                    All Appointments In :
                  </h2>
                  <div className="space-x-2 w-full text-center mt-6  h-auto">
                    <button
                      onClick={() => validatedMonth()}
                      className={`w-[30%] ${
                        colorForCompletedMonth ? "bg-gray-400" : "bg-purple-800"
                      }   text-white text-lg h-12 rounded-md`}
                    >
                      {showMonth(currentMonth.getMonth() - 1)}
                    </button>
                    <button className="w-[30%]  bg-green-300 text-black text-lg h-12 rounded-md">
                      {showMonth(currentMonth.getMonth())}
                    </button>
                    <button
                      onClick={() => {
                        setCurrentMonth((prev) => addDays(prev, 30)),
                          setColorCompletedMonth(false);
                      }}
                      className="w-[30%]  bg-purple-800 text-white text-lg h-12 rounded-md"
                    >
                      {showMonth(currentMonth.getMonth() + 1)}
                    </button>
                  </div>
                  <h3 className="font-medium text-center text-gray-600 text-xl p-4">
                    Or Select Date:
                  </h3>
                  <div>
                    <PatientDashboardCalendar
                      selectedDate={selectedDate}
                      onDateSelect={handleDateSelect}
                      currentMonth={currentMonth}
                      setCurrentMonth={setCurrentMonth}
                    />
                  </div>
                </div>

                {/* right */}
                <div className="w-[65%] pl-[3rem] ">
                  <h2 className="font-medium text-center text-gray-600 text-xl">
                    All Times in{" "}
                    <span className="font-semibold text-gray-800 text-xl">
                      America
                    </span>{" "}
                    Timezone
                  </h2>
                  <div className="mt-2 h-[32rem]">
                    <table className="table-auto w-full">
                      <thead>
                        <tr className="h-10 text-lg">
                          <th className="font-bold p-4 pl-[2rem] w-[30%] text-left">
                            Date
                          </th>
                          <th className="font-bold p-4 text-left w-[20%]">
                            Time
                          </th>
                          <th className="font-bold p-4 text-left w-[25%]">
                            Length
                          </th>
                          <th className="font-bold p-4 text-left"></th>
                        </tr>
                      </thead>
                    </table>
                    <div className="overflow-y-auto h-[32rem]">
                      <table className="table-auto w-full">
                        <tbody>
                          {/* {isLoading && <Loader />}  complete it */}
                          {isLoading}
                          {availabilityData && !isLoading ? (
                            availabilityData?.length > 0 ? (
                              availabilityData?.map((data, index) => (
                                <tr
                                  key={index}
                                  className="border-2 odd:bg-gray-200 text-lg"
                                >
                                  <td className="font-normal p-4 pl-[2rem] w-[30%]">
                                    {dayDate(data?.date)}
                                  </td>
                                  <td className="font-normal p-4 w-[20%]">
                                    {data?.time}
                                  </td>
                                  <td className="font-normal p-4 w-[25%]">
                                    {data?.appointmentType}
                                  </td>
                                  <td
                                    className="font-normal p-4 pr-[4rem] w-[25%] "
                                    onClick={() => {
                                      setToggleModel(true),
                                        setSelectedData({
                                          selectedItemId: data._id,
                                        });
                                    }}
                                  >
                                    <button className="bg-green-300 flex items-center w-full p-4 rounded-md text-gray-700 h-10">
                                      <TiTick />
                                      Select
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <h1 className="text-center">No data Available</h1>
                            )
                          ) : null}

                          <tr></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>

        {toggleModel && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            {loadingBookAppointment ? (
              <Loader />
            ) : (
              <div className="w-[40%] max-w-lg bg-white p-6 rounded-md flex flex-col">
                <h2 className="text-xl font-semibold text-center ">
                  Book Appointment
                </h2>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                  }}
                  validationSchema={validateBookAppointmentForm}
                  onSubmit={handleBookAppointment}
                >
                  <Form className="space-y-4">
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
                      <ErrorBoundary
                        name="name"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`mt-1 block w-full px-3 py-2 border 
                         border-gray-300
                         rounded-md`}
                      />
                      <ErrorBoundary
                        name="email"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <Field
                        type="number"
                        id="phone"
                        name="phone"
                        className={`mt-1 block w-full px-3 py-2 border 
                         "border-gray-300"
                         rounded-md`}
                      />
                      <ErrorBoundary
                        name="phone"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        disabled={buttonDisable}
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointmentsPatient;
