import "./App.css";
import chronicleLogo from "./logo.ico";
import Data from "./components/api.js";
import EssayForm from "./components/forms.js";

function App() {
  return (
    <div className="App-header">
      <header className="App-header">
        <img src={chronicleLogo} className="Chronicle-logo" alt="chronicleLogo" />
        <Data />
        <p>Welcome to Chronicle</p>
      </header>
      <body>
        <EssayForm />
      </body>
    </div>
  );
}

export default App;
