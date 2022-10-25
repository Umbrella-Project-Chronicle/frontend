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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (GetToken()) {
      setIsLoggedIn(true);
      console.log("user is logged in");
    } else {
      setIsLoggedIn(false);
      console.log("user is logged out");
    }
  }, []);

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
