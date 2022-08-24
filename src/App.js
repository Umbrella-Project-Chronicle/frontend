import logo from './logo.svg';
import './App.css';
import chronicleLogo from './logo.ico';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={chronicleLogo} className="Chronicle-logo" alt="chronicleLogo"/>
        <p>
         Welcome to Chronicle
        </p> 
      </header>
    </div>
  );
}

export default App;
