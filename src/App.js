import "./App.css";
import chronicleLogo from "./logo.ico";
import Data from "./components/api.js";
import SignUp from "./components/forms.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FreeText from "./components/freetext";

function App() {
  return (
    <div className="App-header">
      <header className="App-header">
        <Router>
          <div className="App">
            <ul>
              <div>
                <Link to="/entry">Chronicle Today</Link>
              </div>
            </ul>
            <Routes>
              <Route exact path="/entry" element={<FreeText />}></Route>
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
