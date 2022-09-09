import "./App.css";
import chronicleLogo from "./logo.ico";
import Data from "./components/api.js";
import EssayForm from "./components/forms.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={chronicleLogo} className="Chronicle-logo" alt="chronicleLogo" />
        <Data />
        <EssayForm />
        <p>Welcome to Chronicle</p>
      </header>
    </div>
  );
}

export default App;
