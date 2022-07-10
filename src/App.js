import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Shop from './components/Shop'
import Dropdown from './components/Dropdown';
function App() {
  return (
    <div className="App">
      <h1>this is running</h1>
      <Navbar/>
      <Shop/>
      <Dropdown />
    </div>
  );
}

export default App;
