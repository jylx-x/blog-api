import { useState } from "react";
import "./App.css";
import RouteSwitch from "./RouteSwitch.js";

function App() {
  const [user, setUser] = useState();

  return (
    <div className="App overflow-auto font-Raleway">
      <RouteSwitch user={user} setUser={setUser}></RouteSwitch>
    </div>
  );
}

export default App;
