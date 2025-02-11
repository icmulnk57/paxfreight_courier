import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../components/table/ReusableTable";
import TopBar from "../../components/MatxLayout/Layout1/TopBar";
import { Breadcrumb } from "app/components";
import { styled, Box } from "@mui/material";

const Disputes = () => {
  const navigate = useNavigate();

  const tabs = ["Draft", "Manifested", "Dispatched", "Received", "Cancelled", "Disputes"];
  const [activeTab, setActiveTab] = useState("Disputes");

  const Container = styled("div")(({ theme }) => ({
    margin: "10px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
  }));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "Draft":
        navigate("/order/draft");
        break;
      case "Dispatched":
        navigate("/order/dispatched");
        break;
      case "Received":
        navigate("/order/received");
        break;
      case "Cancelled":
        navigate("/order/cancelled");
        break;
      case "Disputes":
        navigate("/order/disputes");
        break;
      case "Manifested":
        navigate("/order/manifested");
        break;
      default:
        navigate("/order/draft");
    }
  };

  const columns = [
    { id: "orderDate", label: "Order Date", minWidth: 150 },
    { id: "orderId", label: "Order ID", minWidth: 150 },
    { id: "customerDetails", label: "Customer Details", minWidth: 200 },
    { id: "packageDetails", label: "Package Details", minWidth: 200 },
    { id: "shipping", label: "Shipping", minWidth: 150 },
    { id: "actions", label: "Actions", minWidth: 100, align: "center" }
  ];

  const rows = [
    {
      id: 1,
      orderDate: "2024-12-01",
      orderId: "ORD12345",
      customerDetails: "John Doe, johndoe@gmail.com",
      packageDetails: "2kg, Electronics",
      shipping: "FedEx, Delivered",
      actions: "Edit | Delete"
    }
  ];

  return (
    <>
      <TopBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      <Container>
        {/* <Box className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Disputes", path: "/order/disputes" }, { name: "" }]} />
            </Box> */}
        <div style={{ padding: "20px" }}>
          {/* <h1>{activeTab}</h1> */}
          <ReusableTable columns={columns} rows={rows} />
        </div>
      </Container>
    </>
  );
};

export default Disputes;
