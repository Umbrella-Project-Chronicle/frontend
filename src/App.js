import './App.css';
import chronicleLogo from './logo.ico';
import Data from './components/api.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={chronicleLogo} className="Chronicle-logo" alt="chronicleLogo"/>
        <p>
         Welcome to Chronicle
        </p> 
        <div ClassName="app"> 
        <Data/>
        </div>
      </header>
    </div>
  );
}

export default App;
