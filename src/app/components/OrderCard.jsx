import React from "react";

const OrderCard = ({ status, message }) => {
  const isSuccess = status === "success";

  return (
    <div
      style={{
        ...styles.card,
        backgroundColor: isSuccess ? "#e6f7e6" : "#fde7e7",
        borderColor: isSuccess ? "#46b971" : "#f55d5d",
      }}
    >
      <div style={styles.iconContainer}>
        {isSuccess ? (
          <span style={{ ...styles.icon, color: "#46b971" }}>✓</span>
        ) : (
          <span style={{ ...styles.icon, color: "#f55d5d" }}>✗</span>
        )}
      </div>
      <div style={styles.messageContainer}>
        <h3 style={styles.title}>{isSuccess ? "Order Successful" : "Order Failed"}</h3>
        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    border: "2px solid",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "15px 0",
    maxWidth: "500px",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  iconContainer: {
    flexShrink: 0,
    fontSize: "24px",
    marginRight: "15px",
  },
  icon: {
    fontWeight: "bold",
  },
  messageContainer: {
    flex: 1,
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
  message: {
    margin: "5px 0 0",
    fontSize: "14px",
    color: "#666",
  },
};

export default OrderCard;
