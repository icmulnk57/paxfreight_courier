import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const KYCForm = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          KYC Form
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 4 }}>
          Please fill in the details below to complete your KYC process.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* PAN Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="PAN Number"
                placeholder="Enter your PAN number"
                variant="outlined"
              />
            </Grid>

            {/* Aadhaar Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Aadhaar Number"
                placeholder="Enter your Aadhaar number"
                variant="outlined"
              />
            </Grid>

            {/* Aadhaar Front Upload */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ justifyContent: "start" }}
              >
                Upload Aadhaar Front
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>
              {image && (
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                  Selected File: {image.name}
                </Typography>
              )}
            </Grid>

            {/* Aadhaar Back Upload */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ justifyContent: "start" }}
              >
                Upload Aadhaar Back
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>
              {image && (
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                  Selected File: {image.name}
                </Typography>
              )}
            </Grid>

            {/* Upload PAN Card */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ justifyContent: "start" }}
              >
                Upload PAN Card
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>
              {image && (
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                  Selected File: {image.name}
                </Typography>
              )}
            </Grid>

            {/* Upload Supporting Document PDF */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ justifyContent: "start" }}
              >
                Upload Supporting Document (PDF)
                <input type="file" hidden accept=".pdf" onChange={handleFileChange} />
              </Button>
              {file && (
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                  Selected File: {file.name}
                </Typography>
              )}
            </Grid>

            {/* Address Details */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Address"
                placeholder="Enter your address"
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>

            {/* Pincode */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Pincode"
                placeholder="Enter your area pincode"
                variant="outlined"
              />
            </Grid>

            {/* State */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="state-label">State</InputLabel>
                <Select labelId="state-label" required>
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                  <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                  <MenuItem value="Bihar">Bihar</MenuItem>
                  {/* Add more states as needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: 1.5 }}
              >
                Submit KYC
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default KYCForm;
