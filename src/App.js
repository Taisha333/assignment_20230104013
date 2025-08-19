import React, { useState } from "react";
import './App.css';
import Sidebar from './components/Sidebar/sidebar';
import Profile from './components/profile';
import Articles from "./components/articles";

const App = () => {
  const [activePage, setActivePage] = useState("profile");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to render the active page component
  const renderActivePage = () => {
    switch(activePage) {
      case 'profile':
        return <Profile />;
      case 'articles':
        return <Articles />;
      default:
        return <Profile />;
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      {/* Main content area */}
      <div
        style={{
          marginLeft: isCollapsed ? "0" : "220px",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Render the active page */}
        {renderActivePage()}
        
        {/* Optional: Keep test buttons for development */}
        <div style={{ 
          position: "fixed", 
          bottom: "20px", 
          right: "20px", 
          display: "flex", 
          gap: "10px",
          zIndex: 100 
        }}>
          

        </div>
      </div>
    </div>
  );
};

export default App;