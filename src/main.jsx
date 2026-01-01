import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ThemeProvider from "./ThemeProvider.jsx";
import Splash from "./components/Splash.jsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <Splash>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Splash>
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
);
