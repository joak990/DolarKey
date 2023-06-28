import { Route, Router, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Views/Home";

function App() {
  return (
    <div className="App">
  <Nav/>
  <Routes>
    <Route path="/" Component={Home}></Route>
  </Routes>
 
    </div>
  );
}

export default App;
