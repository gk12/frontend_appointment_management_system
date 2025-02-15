import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader";
const Signup = lazy(() => import("../pages/Signup"));
const Signin = lazy(() => import("../pages/Signin"));
const PatientDetails = lazy(() => import("../pages/Admin/PatientDetails"));
const DoctorDetails = lazy(() => import("../pages/Admin/DoctorDetails"));
const PatientList = lazy(() => import("../pages/Admin/PatientList"));
const DoctorsList = lazy(() => import("../pages/Admin/DoctorsList"));
const AllAppointmentsDoctor = lazy(() =>
  import("../pages/Doctor/AllAppointmentsDoctor")
);
const ManageAvailabilityCalendar = lazy(() =>
  import("../pages/Doctor/ManageAvailabilityCalendar")
);
const MyAvailability = lazy(() => import("../pages/Doctor/MyAvailability"));
const AllAppointmentsPatient = lazy(() =>
  import("../pages/Patient/AllAppointmentsPatient")
);
const MyAppointments = lazy(() => import("../pages/Patient/MyAppointments"));
const AllAppointmentsAdmin = lazy(() =>
  import("../pages/Admin/AllAppointmentsAdmin")
);
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const Home = lazy(() => import("../pages/Home"));
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "../components/ErrorBoundaryFallback";
import ProtectedRoute from "../components/ProtectedRoute";
import ProtectedRouteWrapper from "../components/ProtectedRouteWrapper";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => {}}
            >
              <Signup />
            </ErrorBoundary>
          </Suspense>
        }
      />
      <Route
        path="/signin"
        element={
          <Suspense fallback={<Loader />}>
            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => {}}
            >
              <Signin />
            </ErrorBoundary>
          </Suspense>
        }
      />
      <Route
        path="/patient/home"
        element={
          <ProtectedRouteWrapper>
            <Home />
          </ProtectedRouteWrapper>
        }
      />

      <Route
        path="/admin/patientsList"
        element={
          <ProtectedRouteWrapper>
            <PatientList />
          </ProtectedRouteWrapper>
        }
      />
      <Route
        path="/admin/doctorsList"
        element={
          <ProtectedRoute
            element={
              <ProtectedRouteWrapper>
                <DoctorsList />
              </ProtectedRouteWrapper>
            }
          />
        }
      />
      <Route
        path="/admin/patientDetails/:id"
        element={
          <ProtectedRoute
            element={
              <ProtectedRouteWrapper>
                <PatientDetails />
              </ProtectedRouteWrapper>
            }
          />
        }
      />
      <Route
        path="/admin/doctorDetails/:id"
        element={
          <ProtectedRouteWrapper>
            <DoctorDetails />
          </ProtectedRouteWrapper>
        }
      />
      <Route
        path="/admin/allAppointment"
        element={
          <ProtectedRouteWrapper>
            <AllAppointmentsAdmin />
          </ProtectedRouteWrapper>
        }
      />
      <Route
        path="/doctor/allAppointment"
        element={
          <ProtectedRouteWrapper>
            <AllAppointmentsDoctor />
          </ProtectedRouteWrapper>
        }
      />
      <Route
        path="/doctor/myAppointmnet"
        element={
          <ProtectedRouteWrapper>
            <MyAvailability />
          </ProtectedRouteWrapper>
        }
      />
      <Route
        path="/doctor/manageAvailability"
        element={
          <ProtectedRouteWrapper>
            <ManageAvailabilityCalendar />
          </ProtectedRouteWrapper>
        }
      />
      <Route
        path="/patient/allAppointment"
        element={
          <ProtectedRouteWrapper>
            <AllAppointmentsPatient />
          </ProtectedRouteWrapper>
        }
      />
      {/* <Route
        path="/patient/home"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => {}}
                >
                  <Home />
                </ErrorBoundary>
              </Suspense>
            }
          />
        }
      /> */}
      <Route
        path="/patient/myAppointmnet"
        element={
          <ProtectedRouteWrapper>
            <MyAppointments />
          </ProtectedRouteWrapper>
        }
      />
      <Route
        path="/verifyEmail/:token"
        element={
          <ProtectedRouteWrapper>
            <VerifyEmail />
          </ProtectedRouteWrapper>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AllRoutes;
