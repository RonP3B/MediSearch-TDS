import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeProvider } from "./components/contexts/ColorModeContext.jsx";

if (import.meta.env.VITE_REACT_ENV === "production") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ColorModeProvider>
  </React.StrictMode>
);
