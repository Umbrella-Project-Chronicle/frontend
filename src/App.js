import "./App.css";
import chronicleLogo from "./logo.ico";
import Data from "./components/api.js";
import SignUp from "./components/forms.js";
import Button from "react-bootstrap/Button";

function App() {
  return (
    <div className="App-header">
      <header className="App-header">
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
