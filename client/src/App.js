import "./App.css";
import RouteSwitch from "./RouteSwitch.js"
import Navbar from "./components/Navbar.js";


function App() {
  return (
    <div className="App overflow-auto font-Raleway">
      <RouteSwitch>
        <Navbar />
      </RouteSwitch>
    </div>
  );
}

export default App;
