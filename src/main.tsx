import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/i18n";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root DOM element not found. Ensure a div with id 'root' exists.");
}
createRoot(container).render(<App />);
