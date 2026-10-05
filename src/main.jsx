import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FeedbackProvider } from "./context/FeedbackContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FeedbackProvider>
        <App />
      </FeedbackProvider>
    </BrowserRouter>
  </StrictMode>
);