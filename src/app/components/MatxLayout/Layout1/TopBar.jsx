import React from "react";
import './../../../../TopBar.css';

const TopBar = ({ tabs, activeTab, onTabChange, onAddOrder }) => {
  return (
    <div style={styles.container}>
      <div style={styles.tabsWrapper}>
        <div style={styles.tabsContainer}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.activeTab : {}),
              }}
              onClick={() => onTabChange(tab)}
              className={activeTab === tab ? 'active' : ''}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <button style={styles.addOrderButton} onClick={onAddOrder}>
        + Add Order
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#ffffff",
    borderBottom: "2px solid #e0e0e0",
    margin: "0",
    gap: "10px",
    overflow: "hidden",
  },
  tabsWrapper: {
    flex: 1,
    overflowX: "auto",
    whiteSpace: "nowrap",
    scrollbarWidth: "none", // Hides scrollbar in Firefox
    msOverflowStyle: "none", // Hides scrollbar in Edge/IE
  },
  tabsContainer: {
    display: "flex",
    gap: "10px",
  },
  tab: {
    padding: "10px 15px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    color: "#666",
    transition: "color 0.3s ease, transform 0.2s",
    flexShrink: 0, // Prevents tabs from shrinking
  },
  activeTab: {
    color: "#46b971",
    fontWeight: "600",
    transform: "scale(1.05)",
  },
  addOrderButton: {
    padding: "10px 20px",
    border: "none",
    background: "#46b971",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s, box-shadow 0.3s, transform 0.2s",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
    marginLeft: "10px",
  },
};

/* Inject CSS for smooth scrolling and hiding scrollbars */
const mediaStyles = `
  .tabsWrapper::-webkit-scrollbar {
    display: none; /* Hides scrollbar in Chrome/Safari */
  }
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .tabsWrapper {
      width: 100%;
    }
    .tabsContainer {
      justify-content: flex-start;
      overflow-x: auto;
    }
    .addOrderButton {
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = mediaStyles;
document.head.appendChild(styleSheet);

export default TopBar;
