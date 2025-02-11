import React from "react";
import './../../../../TopBar.css';

const TopBar = ({ tabs, activeTab, onTabChange, onAddOrder }) => {
  return (
    <div style={styles.container}>
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
      <button style={styles.addOrderButton} onClick={onAddOrder} >
        + Add Order
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px", // Increased padding for better spacing
    background: "#ffffff",
    // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
    borderBottom: "2px solid #e0e0e0", // Thicker border for more definition
    margin: "0", // Removed margin to prevent upper gap
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tab: {
    padding: "12px 20px", // Adjusted padding for better balance
    margin: "0 15px", // Increased spacing between tabs
    border: "none",
    background: "transparent", // No background for tabs
    cursor: "pointer",
    fontSize: "17px", // Slightly larger font size
    fontWeight: "500",
    color: "#666", // Default color for inactive tab
    borderRadius: "0", // Remove border radius to avoid button-like appearance
    textDecoration: "none", // Remove underline from the text
    position: "relative", // For the underline effect
    transition: "color 0.3s ease, transform 0.2s", // Smooth transition for hover and active states
  },
  activeTab: {
    color: "#46b971", // Green color for the active tab
    fontWeight: "600", // Bold active tab text
    transform: "scale(1.05)", // Slight scaling effect on active tab
  },
  addOrderButton: {
    padding: "10px 20px", // Adjusted padding for a more substantial button
    marginLeft: "auto", 
    marginRight: "20px", // Increased right margin for balance
    border: "none",
    background: "#46b971",
    color: "#ffffff",
    fontSize: "17px", // Consistent font size with tabs
    fontWeight: "600",
    borderRadius: "8px", // Rounded corners for a more modern look
    cursor: "pointer",
    transition: "background 0.3s, box-shadow 0.3s, transform 0.2s", // Smooth transition for hover effects
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Slightly stronger shadow
    letterSpacing: "0.5px", // Matching letter spacing
  },
};

export default TopBar;
