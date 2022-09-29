import "./App.css";
import Data from "./Components/api.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FreeText from "./Components/Forms/FreeText";
import Home from "./Pages/home.js";
import chronicleLogo from "../src/logo.ico";
import SignIn from "./Components/Forms/SignIn.js";
import Welcome from "./Components/Forms/Welcome.js";

function App() {
  return (
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
            <Route path="/" element={<Home />}></Route>
            <Route path="/entry" element={<FreeText />}></Route>
            <Route path="/login" element={<SignIn />}></Route>
            <Route path="/welcome" element={<Welcome />}></Route>
            <Route path="/entry" element={<FreeText />}></Route>
          </Routes>
        </Router>
        {/* <Data /> */}
      </header>
    </div>
  );
}

export default App;
