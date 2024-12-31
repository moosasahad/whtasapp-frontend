import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Productcontext from "./components/Component/Productcontext.jsx";
import Usercontext from "./components/Component/Usercontext.jsx";
import Contact from "./components/Component/Contact.jsx";
import Groupcontext from "./components/Component/groupcontext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Contact>
        <Productcontext>
          <Usercontext>
            <Groupcontext>
              <App />
            </Groupcontext>
          </Usercontext>
        </Productcontext>
      </Contact>
    </BrowserRouter>
  </StrictMode>
);
