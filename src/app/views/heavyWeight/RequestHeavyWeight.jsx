import React from "react";
import { Box, Button, MenuItem, Select, TextField, Typography, FormControl } from "@mui/material";
import { Breadcrumb } from "app/components";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material";
import { Formik, Field, Form } from "formik";

  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const RequestHeavyWeight = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Heavy Weight", path: "/heavy-weight" }, { name: "" }]}
        />
      </Box>
      {/* <Box sx={{ p: 3, bgcolor: "#f9fafb", borderRadius: 2, boxShadow: 0 }}> */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Shipment Details
        </Typography>
        <Formik
          initialValues={{
            weight: "",
            noOfBoxes: "",
            country: "",
            pinCode: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid size={{ md: 6, xs: 12 }}>
                  <FormControl fullWidth>
                    <Typography variant="subtitle1" mb={1}>Weight (Kg.)</Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      name="weight"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.weight}
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                  <FormControl fullWidth>
                    <Typography variant="subtitle1" mb={1}>No. of Boxes</Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      name="noOfBoxes"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.noOfBoxes}
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                  <FormControl fullWidth>
                    <Typography variant="subtitle1" mb={1}>Country</Typography>
                    <Field
                      as={Select}
                      name="country"
                      displayEmpty
                      variant="outlined"
                      value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="" disabled>
                        --Select Country--
                      </MenuItem>
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                      <MenuItem value="UK">UK</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                  <FormControl fullWidth>
                    <Typography variant="subtitle1" mb={1}>Pin Code</Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      name="pinCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.pinCode}
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ md: 1, xs: 12 }}>
                  <Button variant="contained" color="primary" fullWidth type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      {/* </Box> */}
    </Container>
  );
};

export default RequestHeavyWeight;
