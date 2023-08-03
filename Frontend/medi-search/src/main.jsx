import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles/css/styles.css";
import { ColorModeProvider } from "./components/contexts/ColorModeContext.jsx";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import MediSearchInterceptor from "./components/interceptors/MediSearchInterceptor.jsx";

if (import.meta.env.VITE_REACT_ENV === "production") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeProvider>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <MediSearchInterceptor>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </MediSearchInterceptor>
        </AuthProvider>
      </BrowserRouter>
    </ColorModeProvider>
  </React.StrictMode>
);
