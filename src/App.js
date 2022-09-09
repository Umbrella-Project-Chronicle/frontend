import "./App.css";
import chronicleLogo from "./logo.ico";
import Data from "./components/api.js";
import SignUp from "./components/forms.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";

function App() {
  return (
    <div className="App-header">
      <header className="App-header">
        <Router>
          <div className="App">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/entry">Chronicle Today</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/contact" element={<Contact />}></Route>
            </Routes>
          </div>
        </Router>
        <img src={chronicleLogo} className="Chronicle-logo" alt="chronicleLogo" />
        <Data />
        <p>Welcome to Chronicle</p>
        <div>
          <SignUp />
        </div>
      </header>
    </div>
  );
}

export default App;
