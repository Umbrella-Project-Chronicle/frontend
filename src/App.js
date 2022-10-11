import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FreeText from "./Components/Forms/FreeText";
import chronicleLogo from "../src/logo.ico";
import SignIn from "./Components/Forms/SignIn.js";
import SignUp from "./Components/Forms/SignUp.js";
import Welcome from "./Components/Forms/Welcome.js";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Dashboard from "./Components/Forms/test.js";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div>
        <header
          className="App-header"
          style={{
            backgroundImage: `url(${chronicleLogo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<SignUp />}></Route>
              <Route path="/entry" element={<FreeText />}></Route>
              <Route path="/login" element={<SignIn />}></Route>
              <Route path="/welcome" element={<Welcome />}></Route>
              <Route path="/entry" element={<FreeText />}></Route>
              <Route path="/test" element={<Dashboard />}></Route>
            </Routes>
          </Router>
          {/* <Data /> */}
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
