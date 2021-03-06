import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./screens/Login";
import Home from "./screens/Home";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
