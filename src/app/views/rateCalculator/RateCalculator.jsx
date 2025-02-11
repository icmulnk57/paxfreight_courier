import React, { useState } from "react";
import {
  Box,
  
  TextField,
  MenuItem,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { styled } from "@mui/material";
import { Breadcrumb } from "app/components";

const RateCalculator = () => {
  const [showResults, setShowResults] = useState(false);

  const validationSchema = Yup.object({
    pickupCountry: Yup.string().required("Pick-up Country is required"),
    countryRegion: Yup.string().required(
      "Destination Country/Region is required"
    ),
    weight: Yup.number()
      .positive("Weight must be a positive number")
      .required("Weight is required"),
    postcode: Yup.string()
      .matches(/^\d{5,6}$/, "Postcode must be 5-6 digits")
      .required("Postcode is required"),
  });

  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const initialValues = {
    pickupCountry: "India",
    countryRegion: "",
    weight: "",
    postcode: "",
  };

  const handleCalculate = (values) => {
    console.log("Form Data:", values);
    setShowResults(true);
  };

  const handleReset = (resetForm) => {
    resetForm();
    setShowResults(false);
  };

  return (
    <Container>
     <Box className="breadcrumb">
  <Breadcrumb
    routeSegments={[
      { name: "Rate Calculator", path: "/rate-calculator" },
      { name: "" },
    ]}
  />

  <Grid container justifyContent="flex-end" >
    <Grid size={{ xs: 12, sm: "auto" }}  >
      <Button
        type="button"
        variant="outlined"
        color="error"
        onClick={() => handleReset(resetForm)}
      >
        Reset
      </Button>
    </Grid>
  </Grid>
</Box>


      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleCalculate(values)}
      >
        {({ resetForm }) => (
          <Form>
            <Grid container spacing={3} marginBottom={3}>
              {/* Left Section */}
              < Grid size ={{ md: 6, xs: 12 }}>
                <Field
                  as={TextField}
                  label="Pick-up Country"
                  name="pickupCountry"
                  fullWidth
                  disabled
                />
                <ErrorMessage
                  name="pickupCountry"
                  component="div"
                  style={{ color: "red", fontSize: "0.8rem" }}
                />
              </Grid>
              <Grid size ={{ md: 6, xs: 12 }} >
                <Field
                  as={TextField}
                  select
                  label="Destination Country/Region"
                  name="countryRegion"
                  fullWidth
                >
                  <MenuItem value="United Kingdom (GBR)">
                    United Kingdom (GBR)
                  </MenuItem>
                  <MenuItem value="United States (USA)">
                    United States (USA)
                  </MenuItem>
                </Field>
                <ErrorMessage
                  name="countryRegion"
                  component="div"
                  style={{ color: "red", fontSize: "0.8rem" }}
                />
              </Grid>
              {/* Right Section */}
              <Grid size ={{ md: 6, xs: 12 }} >
                <Field
                  as={TextField}
                  label="Weight (KG)"
                  name="weight"
                  type="number"
                  fullWidth
                />
                <ErrorMessage
                  name="weight"
                  component="div"
                  style={{ color: "red", fontSize: "0.8rem" }}
                />
              </Grid>
              <Grid size ={{ md: 6, xs: 12 }} >
                <Field
                  as={TextField}
                  label="Postcode"
                  name="postcode"
                  fullWidth
                />
                <ErrorMessage
                  name="postcode"
                  component="div"
                  style={{ color: "red", fontSize: "0.8rem" }}
                />
              </Grid>
            </Grid>

            {/* Buttons */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: "auto" }} >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  
                >
                  Calculate
                </Button>
              </Grid>
             
            </Grid>
          </Form>
        )}
      </Formik>

      {/* Results Section */}
      {showResults && (
        <>
          <Typography variant="h6" marginBottom={2}>
            Weight Summary
          </Typography>
          <Grid container spacing={3} marginBottom={3}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  5.00 KG
                </Typography>
                <Typography variant="caption">Dead Weight</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  0.00 KG
                </Typography>
                <Typography variant="caption">Volumetric Weight</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                  border: "2px dashed #4caf50",
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  5.00 KG
                </Typography>
                <Typography variant="caption">Billed Weight</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Typography variant="h6" marginBottom={2}>
            Rate Options
          </Typography>
          <RadioGroup name="rateOption">
            <FormControlLabel
              value="premium"
              control={<Radio />}
              label={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      ShipGlobal Premium
                    </Typography>
                    <Typography variant="caption">Transit: 6-9 Days</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="green">
                      ₹2562
                    </Typography>
                    <Typography variant="caption">Cheapest</Typography>
                  </Box>
                </Box>
              }
            />
            <FormControlLabel
              value="direct"
              control={<Radio />}
              label={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      ShipGlobal Direct
                    </Typography>
                    <Typography variant="caption">
                      Transit: 7-10 Days
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="textPrimary">
                      ₹2782
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </RadioGroup>
        </>
      )}
    </Container>
  );
};

export default RateCalculator;
