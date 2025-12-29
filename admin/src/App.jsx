import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Contexts */
import { AdminContext } from "./context/admincon";
import { DocContext } from "./context/docCon";

/* Layout */
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";

/* Pages */
import Login from "./pages/login";

/* Admin Pages */
import Dash from "./pages/Admin/Dash";
import Allapoint from "./pages/Admin/Allapoint";
import Adddoc from "./pages/Admin/Adddoc";
import Doclist from "./pages/Admin/Doclist";

/* Doctor Pages */
import Docdash from "./pages/Doctor/Docdash";
import Docappoi from "./pages/Doctor/Docappoi";
import Docprof from "./pages/Doctor/Docprof";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DocContext);

  /* =========================
     NOT LOGGED IN
  ========================== */
  if (!atoken && !dtoken) {
    return (
      <>
        <ToastContainer position="top-center" />
        <Login />
      </>
    );
  }

  /* =========================
     LOGGED IN
  ========================== */
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-center" />
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          <Routes>
            {/* DEFAULT REDIRECT */}
            <Route
              path="/"
              element={
                atoken ? (
                  <Navigate to="/admin-dashboard" replace />
                ) : (
                  <Navigate to="/doctor-dashboard" replace />
                )
              }
            />

            {/* ========== ADMIN ROUTES ========== */}
            {atoken && (
              <>
                <Route path="/admin-dashboard" element={<Dash />} />
                <Route path="/all-appointments" element={<Allapoint />} />
                <Route path="/add-doctor" element={<Adddoc />} />
                <Route path="/doctor-list" element={<Doclist />} />
              </>
            )}

            {/* ========== DOCTOR ROUTES ========== */}
            {dtoken && (
              <>
                <Route path="/doctor-dashboard" element={<Docdash />} />
                <Route path="/doctor-appointments" element={<Docappoi />} />
                <Route path="/doctor-profile" element={<Docprof />} />
              </>
            )}

            {/* FALLBACK (INVALID URL) */}
            <Route
              path="*"
              element={
                atoken ? (
                  <Navigate to="/admin-dashboard" replace />
                ) : (
                  <Navigate to="/doctor-dashboard" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
