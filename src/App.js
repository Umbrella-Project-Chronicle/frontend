import "./App.css";
import Data from "./Components/api.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FreeText from "./Components/freetext";
import Home from "./Pages/home.js";
import chronicleLogo from "../src/logo.ico";

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
            <Route path="/entry" element={<FreeText />}></Route>t
          </Routes>
        </Router>
        <Data />
      </header>
    </div>
  );
}

export default App;
