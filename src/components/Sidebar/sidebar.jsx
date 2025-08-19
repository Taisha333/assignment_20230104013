import React from "react"; // Fix: Add React import

const Sidebar = ({ activePage, setActivePage, isCollapsed, setIsCollapsed }) => {
  // Overlay
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    transition: "opacity 0.3s ease",
    opacity: isCollapsed ? 0 : 1,
    pointerEvents: isCollapsed ? "none" : "auto",
    zIndex: 5,
  };

  const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: isCollapsed ? "-220px" : "0",
    width: "220px",
    backgroundColor: "#1f1f2e",
    color: "#fff",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    transition: "left 0.3s ease",
    zIndex: 10,
    overflow: "hidden",
    boxShadow: isCollapsed ? "none" : "2px 0 10px rgba(0,0,0,0.3)",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  };

  const titleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
  };

  const toggleBtnStyle = {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    zIndex: 15,
  };

  const menuStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flex: 1,
  };

  const menuItemStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    padding: "0.8rem 1rem",
    cursor: "pointer",
    position: "relative",
    backgroundColor: active ? "#2c2c3f" : "transparent",
    transition: "background 0.3s, transform 0.2s",
    userSelect: "none",
  });

  const menuItemHover = {
    backgroundColor: "#3a3a50",
    transform: "translateX(5px)",
  };

  const iconStyle = {
    marginRight: "1rem",
    fontSize: "1.2rem",
  };

  const labelStyle = {
    whiteSpace: "nowrap",
  };

  return (
    <>
      {/* Overlay */}
      <div style={overlayStyle} onClick={() => setIsCollapsed(true)} />

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Dashboard</h2>
          <button
            style={toggleBtnStyle}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            ✕
          </button>
        </div>

        <ul style={menuStyle}>
          {["profile", "articles"].map((page) => (
            <li
              key={page}
              style={menuItemStyle(activePage === page)}
              onClick={() => setActivePage(page)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = menuItemHover.backgroundColor;
                e.currentTarget.style.transform = menuItemHover.transform;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  activePage === page ? "#2c2c3f" : "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <span style={iconStyle}>{page === "profile" ? "👤" : "📄"}</span>
              <span style={labelStyle}>{page === "profile" ? "Profile" : "My Articles"}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hamburger button for collapsed state */}
      {isCollapsed && (
        <button
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            background: "none",
            border: "none",
            color: "#1f1f2e",
            fontSize: "2rem",
            cursor: "pointer",
            zIndex: 15,
          }}
          onClick={() => setIsCollapsed(false)}
        >
          ☰
        </button>
      )}
    </>
  );
};

export default Sidebar;