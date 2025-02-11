import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableTable from "app/components/table/ReusableTable"; 
import { CircularProgress } from "@mui/material";
import { getOrdersAsync } from "app/features/order/orderSlice";
import TopBar from "app/components/MatxLayout/Layout1/TopBar";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "app/components";
import { styled, Box } from "@mui/material";

const Cancelled = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { orders, isLoading } = useSelector((state) => state.order); 

  const tabs = ["Draft", "Manifested", "Dispatched", "Received", "Cancelled", "Disputes"];
  const [activeTab, setActiveTab] = useState("Cancelled");

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
    {
      field: "order_id",
      headerName: "Order ID",
      width: 150,
      headerAlign: "center",
      type: "string",
      align: "center",
      editable: true,
    },
    {
      field: "address",  
      headerName: "Customer Details",
      width: 250,
      headerAlign: "center",
      type: "string",
      align: "center",
      editable: false,
    },
    {
      field: "package_details",
      headerName: "Package Details",
      width: 250,
      headerAlign: "center",
      type: "string",
      align: "center",
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => (
        <span style={{ color: value === "DRAFT" ? "green" : "gray" }}>
          {value}
        </span>
      ),
    },
    {
      field: "order_date",
      headerName: "Created At",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleSaveRow = (newRowData) => {
    console.log("Row saved:", newRowData);
  };

  const handleDeleteRow = (rowId) => {
    console.log("Row deleted:", rowId);
  };

  const handleCreateRowData = () => {
    console.log("Creating new row...");
  };

  useEffect(() => {
    dispatch(getOrdersAsync());
  }, [dispatch]);

  return (
    <>
      <TopBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <div style={{ padding: "20px" }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ReusableTable
            columns={columns}
            rows={orders}  
            pageSize={5}
            onRowClick={() => {}}
            loading={isLoading}
            onEdit={handleSaveRow}
            onDelete={handleDeleteRow}
            onCreate={handleCreateRowData}
          />
        )}
      </div>
    </>
  );
};

export default Cancelled;
