import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField, Input } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {  updateKyc } from "app/features/profile/profileSlice"; 
import { useSnackbar } from "notistack";

const UpdateKYCModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
   const { enqueueSnackbar } = useSnackbar();

  const handleFileChange = (e, type) => {
    if (type === "aadhar") {
      setAadharFile(e.target.files[0]);
    } else if (type === "pan") {
      setPanFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (aadharFile && panFile && aadharNumber && panNumber) {
      const formData = new FormData();
      formData.append("aadhaar", aadharFile);
      formData.append("pan", panFile);
      formData.append("addhar", aadharNumber);
      formData.append("panno", panNumber);
      dispatch(updateKyc(formData));
      enqueueSnackbar("KYC updated successfully", { variant: "success" });
      onClose();
    } else {
      enqueueSnackbar("Please fill in all the fields", { variant: "error" });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 4,
          backgroundColor: "white",
          width: 400,
          margin: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Centering modal
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Update KYC Details
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          Aadhar Number
        </Typography>
        <TextField
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          fullWidth
          label="Enter Aadhar Number"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />

        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          Aadhar Upload
        </Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFile />}
          sx={{ marginBottom: 2 }}
        >
          {aadharFile ? aadharFile.name : "Upload Aadhar"}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "aadhar")}
            sx={{ display: "none" }}
          />
        </Button>

        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          PAN Number
        </Typography>
        <TextField
          value={panNumber}
          onChange={(e) => setPanNumber(e.target.value)}
          fullWidth
          label="Enter PAN Number"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />

        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          PAN Upload
        </Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFile />}
          sx={{ marginBottom: 2 }}
        >
          {panFile ? panFile.name : "Upload PAN"}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "pan")}
            sx={{ display: "none" }}
          />
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Submit KYC
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateKYCModal;
