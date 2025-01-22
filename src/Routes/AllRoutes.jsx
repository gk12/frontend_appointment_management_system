import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import PatientDetails from "../pages/Admin/PatientDetails";
import DoctorDetails from "../pages/Admin/DoctorDetails";
import PatientList from "../pages/Admin/PatientList";
import DoctorsList from "../pages/Admin/DoctorsList";
import AllAppointmentsDoctor from "../pages/Doctor/AllAppointmentsDoctor";
import ManageAvailabilityCalendar from "../pages/Doctor/ManageAvailabilityCalendar";
import MyAvailability from "../pages/Doctor/MyAvailability";
import AllAppointmentsPatient from "../pages/Patient/AllAppointmentsPatient";
import MyAppointments from "../pages/Patient/MyAppointments";
import AllAppointmentsAdmin from "../pages/Admin/AllAppointmentsAdmin";
import VerifyEmail from "../pages/VerifyEmail";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/admin/patientsList" element={<PatientList />}></Route>
      <Route path="/admin/doctorsList" element={<DoctorsList />}></Route>
      <Route
        path="/admin/patientDetails/:id"
        element={<PatientDetails />}
      ></Route>
      <Route
        path="/admin/doctorDetails/:id"
        element={<DoctorDetails />}
      ></Route>
      <Route
        path="/admin/allAppointment"
        element={<AllAppointmentsAdmin />}
      ></Route>
      <Route
        path="/doctor/allAppointment"
        element={<AllAppointmentsDoctor />}
      ></Route>
      <Route path="/doctor/myAppointmnet" element={<MyAvailability />}></Route>
      <Route
        path="/doctor/manageAvailability"
        element={<ManageAvailabilityCalendar />}
      ></Route>
      <Route
        path="/patient/allAppointment"
        element={<AllAppointmentsPatient />}
      ></Route>
      <Route path="/patient/myAppointmnet" element={<MyAppointments />}></Route>
      <Route path="/verifyEmail/:token" element={<VerifyEmail />}></Route>
    </Routes>
  );
};

export default AllRoutes;
