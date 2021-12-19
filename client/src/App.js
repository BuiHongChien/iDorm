import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dorm from "./components/pages/Dorm";

import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/register" exact element={<Register />}/>
          <Route path="/info/:dormid" element={<Dorm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
