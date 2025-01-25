import React from "react";
import { Route, Routes } from "react-router-dom";
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
const AllAppointmentsAdmin = lazy(() => "../pages/Admin/AllAppointmentsAdmin");
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const Home = lazy(() => import("../pages/Home"));
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "../components/ErrorBoundaryFallback";
import ProtectedRoute from "../components/ProtectedRoute";

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
        path="/admin/patientsList"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => {}}
                >
                  <PatientList />
                </ErrorBoundary>
              </Suspense>
            }
          />
        }
      />
      <Route
        path="/admin/doctorsList"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => {}}
                >
                  <DoctorsList />
                </ErrorBoundary>
              </Suspense>
            }
          />
        }
      />
      <Route
        path="/admin/patientDetails/:id"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => {}}
                >
                  <PatientDetails />
                </ErrorBoundary>
              </Suspense>
            }
          />
        }
      />
      <Route
        path="/admin/doctorDetails/:id"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => {}}
                >
                  <DoctorDetails />
                </ErrorBoundary>
              </Suspense>
            }
          />
        }
      />
      <Route
        path="/admin/allAppointment"
        element={
          <Suspense fallback={<Loader />}>
            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => {}}
            >
              <AllAppointmentsAdmin />
            </ErrorBoundary>
          </Suspense>
        }
      />
      <Route
        path="/doctor/allAppointment"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => {}}
                >
                  <AllAppointmentsDoctor />
                </ErrorBoundary>
              </Suspense>
            }
          />
        }
      />
      <Route
        path="/doctor/myAppointmnet"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => {}}
                >
                  <MyAvailability />
                </ErrorBoundary>
              </Suspense>
            }
          />
        }
      />
      <Route
        path="/doctor/manageAvailability"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => {}}
                >
                  <ManageAvailabilityCalendar />
                </ErrorBoundary>
              </Suspense>
            }
          />
        }
      />{" "}
      <Route
        path="/patient/allAppointment"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => {}}
                >
                  <AllAppointmentsPatient />
                </ErrorBoundary>
              </Suspense>
            }
          />
        }
      />
      <Route
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
      />
      <Route
        path="/patient/myAppointmnet"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => {}}
                >
                  <MyAppointments />
                </ErrorBoundary>
              </Suspense>
            }
          />
        }
      />
      <Route
        path="/verifyEmail/:token"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => {}}
                >
                  <VerifyEmail />
                </ErrorBoundary>
              </Suspense>
            }
          />
        }
      />
    </Routes>
  );
};

export default AllRoutes;
