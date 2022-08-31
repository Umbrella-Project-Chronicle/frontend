import './App.css';
import chronicleLogo from './logo.ico';
import Data from './components/api.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={chronicleLogo} className="Chronicle-logo" alt="chronicleLogo"/>
        <Data/>
        <p>
         Welcome to Chronicle
        </p> 
      </header>
    </div>
  );
}

export default App;
