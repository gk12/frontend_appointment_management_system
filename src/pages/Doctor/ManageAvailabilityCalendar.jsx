import React, { useContext, useEffect, useState } from "react";
import UserAuthContext from "../../context/UserAuthContext";
import { axiosInstance } from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import moment from "moment";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AvailabilityCalendar from "../../components/AvailabilityCalendar";
import useDisableButton from "../../hooks/useDisableButton";

const ManageAvailabilityCalendar = () => {
  const [toggleModel, setToggleModel] = useState("");
  const [minDateForStartTime, setMinDateForStartTime] = useState("");
  const [minDateForEndTime, setMinDateForEndTime] = useState("");
  const [eventListData, setEventListData] = useState([]);
  const { user } = useContext(UserAuthContext);
  const [doctorId, setDoctorId] = useState(user?.id);
  const [manageStartTime, setManageStartTime] = useState({
    isStart: false,
    val: "",
  });
  const [manageEndTime, setManageEndTime] = useState({
    isEnd: false,
    val: "",
  });
  const [formData, setFormData] = useState({
    availability: "true",
    startTime: "",
    endTime: "",
  });
  const { handleButtonDisablity, handleResetButton, buttonDisable } =
    useDisableButton();
  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "endTime") {
      setManageEndTime({ isEnd: true, val: value });
    }
    if (name === "startTime") {
      setManageStartTime({ isStart: true, val: value });
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    handleButtonDisablity();
    const { availability, startTime, endTime } = formData;
    try {
      const response = await axiosInstance.post(
        "api/doctor/createAvailability",
        { availability, startTime, endTime, doctorId }
      );
      setFormData({
        availability: "",
        startTime: "",
        endTime: "",
      });
      setDoctorId("");
      setToggleModel(false);
      getCalendarData();
      toast.success("Availbility Added Successfully");
    } catch (error) {
      toast.error(error);
    }
    handleResetButton();
  }
  async function getCalendarData() {
    try {
      const response = await axiosInstance.get(
        "api/doctor/showDoctorsAvailability"
      );
      const mappedData = [response?.data?.doctorsAvailabilities].map(
        (data) => ({
          title: data.availability === true ? "Available Slots" : "",
          start: moment(data.startDateTime).toDate(),
          end: moment(data.endDateTime).toDate(),
        })
      );
      setEventListData(mappedData);
    } catch (error) {
      console.log(error, "erro");
      toast.error(error);
    }
  }

  function handleTodayMinDateTime() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedTime = currentDate
      .toISOString()
      .split("T")[1]
      .substring(0, 5); // Get HH:mm

    return `${formattedDate}T${formattedTime}`;
  }
  function dateTimeFormating(dateVal) {
    const currentDate = new Date(dateVal);
    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedTime = currentDate
      .toISOString()
      .split("T")[1]
      .substring(0, 5); // Get HH:mm

    return `${formattedDate}T${formattedTime}`;
  }
  useEffect(() => {
    if (manageStartTime.isStart) {
      const formatedDate = dateTimeFormating(manageStartTime.val);
      setMinDateForEndTime(formatedDate);
    }
    if (manageEndTime.isEnd) {
      const formatedDate = dateTimeFormating(manageEndTime.val);
      setMinDateForStartTime(formatedDate);
    }
    getCalendarData();
  }, [manageStartTime, manageEndTime]);

  useEffect(() => {
    setDoctorId(user?.id);
    getCalendarData();
  }, [user]);
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-[30%]  ">
              <div className="w-full h-8 mb-14 justify-between">
                <div>
                  <h1 className="font-bold text-3xl">Manage Availability</h1>
                </div>
                <div className="flex justify-end">
                  <button
                    disabled={buttonDisable}
                    onClick={() => setToggleModel(true)}
                    className="bg-blue-600 rounded-md px-4 py-2 text-white"
                  >
                    Add Availability
                  </button>
                </div>
              </div>
              {toggleModel && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                  <div className="w-[40%] max-w-lg bg-white p-6 rounded-md flex flex-col">
                    <h2 className="text-xl font-semibold text-center mb-4">
                      Add Availability
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="availability"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Availability
                        </label>

                        <select
                          value={formData.availability}
                          name="availability"
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select Availability</option>
                          <option value="true">Available</option>
                          <option value="false">Not Available</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="startTime"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Start Date and Time:
                        </label>
                        <input
                          type="datetime-local"
                          id="startTime"
                          name="startTime"
                          max={minDateForStartTime}
                          min={handleTodayMinDateTime()}
                          value={formData.startTime}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="endTime"
                          className="block text-sm font-medium text-gray-700"
                        >
                          End Date and Time:
                        </label>
                        <input
                          type="datetime-local"
                          id="endTime"
                          name="endTime"
                          min={minDateForEndTime}
                          value={formData.endTime}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          type="submit"
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
                    </form>
                  </div>
                </div>
              )}
              <div className="">
                <AvailabilityCalendar eventListData={eventListData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAvailabilityCalendar;
