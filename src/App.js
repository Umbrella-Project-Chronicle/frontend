import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FreeText from "./Components/Forms/FreeText";
import chronicleLogo from "../src/logo.ico";
import SignIn from "./Components/Forms/SignIn.js";
import SignUp from "./Components/Forms/SignUp.js";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import LandingPage from "./Components/Forms/LandingPage.js";
import { useState, useEffect } from "react";
import GetToken from "./Components/Forms/CachedToken";
import SignOut from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/Components/Forms/SignOut.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [warning, setWarning] = useState(false);

  setInterval(() => {
    // console.log("set 1 min interval for inactivity");
    if (GetToken()) {
      const now = new Date().getTime();
      const setUpTime = Number(localStorage.getItem("setUpTime"));
      // console.log("now", now, "setuptime", setUpTime);
      if (now - setUpTime > 0.5 * 60 * 60 * 1000) {
        SignOut();
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        // console.log("user is logged in");
      }
    } else {
      setIsLoggedIn(false);
      // console.log("user is logged out");
    }
  }, 60 * 1000);

  return (
    <div>
      <CssBaseline />
      <body
        className="App-header"
        style={{
          backgroundImage: `url(${chronicleLogo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/entry" element={<FreeText />}></Route>
            <Route path="/login" element={<SignIn />}></Route>
            <Route path="/entry" element={<FreeText />}></Route>
            <Route path="/welcome" element={<LandingPage />}></Route>
            <Route path="/user" element={<LandingPage />}></Route>
          </Routes>
        </Router>
      </body>
    </div>
  );
}

export default App;
