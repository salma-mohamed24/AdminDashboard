import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Usermanagement from "./pages/usermanagement";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Router>
      <Header onToggleNav={toggleSidebar} showSidebar={showSidebar} />
    

      <div className={`content ${showSidebar ? "content-visible" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={<Usermanagement showSidebar={showSidebar} />}
          />
        </Routes>
        <Sidebar show={showSidebar} />
      </div>
    </Router>
  );
}

export default App;
