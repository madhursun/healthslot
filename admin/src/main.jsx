import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider, { AdminContext } from "./context/admincon.jsx";
import DocContextProvider, { DocContext } from "./context/docCon.jsx";
import AppContextProvider, { AppContext } from "./context/appcon.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DocContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DocContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
