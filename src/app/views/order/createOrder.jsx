import React, { useState } from "react";
import { Autocomplete, Button, Paper, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import OrderStepper from "app/components/OrderStepper";
import Grid from "@mui/material/Grid2";
import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb } from "app/components";
import PersonIcon from "@mui/icons-material/Person"; // Icon for CSB IV
import BusinessIcon from "@mui/icons-material/Business"; // Icon for CSB V
import { Card, CardContent, Radio, FormControlLabel } from "@mui/material";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createOrderAsync } from "app/features/order/orderSlice";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import OrderStatusModal from "app/components/OrderStatusModal ";


const CreateOrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [activeStep, setActiveStep] = useState(0);
  

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const [selectedType, setSelectedType] = useState("");
 const { enqueueSnackbar } = useSnackbar();

 const [modalOpen, setModalOpen] = useState(false);
 const [modalContent, setModalContent] = useState({ title: "", message: "", type: "" });
 const openModal = (content) => {
  setModalContent(content);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

  const handleSelection = (type) => {
    setSelectedType(type);
  };
  const top100Films = [
    {
      title: "Eternal Sunshine of the Spotless Mind",
      year: 2004
    }
  ];

  // Validation schemas
  const validationSchemas = [
  
    // Order Details Validation
    Yup.object({
      orderDetails: Yup.object({
        shipment_type: Yup.string().required("Shipment type is required"),
      actual_weight: Yup.number().required("Actual weight is required").positive().min(0.1),
      length: Yup.number().required("Length is required").positive("Length must be positive"),
      breadth: Yup.number().required("Breadth is required").positive("Breadth must be positive"),
      height: Yup.number().required("Height is required").positive("Height must be positive"),
      invoice_no: Yup.string().required("Invoice number is required"),
      invoice_date: Yup.date().required("Invoice date is required"),
      invoice_currency: Yup.string().required("Invoice currency is required"),
      order_ref_id: Yup.string().required("Order reference ID is required"),
      ioss_number: Yup.string().notRequired(),
      address1: Yup.string().required("Address 1 is required"),
      address2: Yup.string().notRequired(),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string().required("Pincode is required"),
      country: Yup.string().required("Country is required"),
      })
      
    }),

    // Item Details Validation
    Yup.object({
      itemDetails: Yup.array()
        .of(
          Yup.object({
            product_name: Yup.string().required("Product name is required"),
            sku: Yup.string().required("SKU is required"),
            hsn: Yup.string().required("HSN is required"),
            quantity: Yup.number().required("Quantity is required").positive().integer(),
            unit_price: Yup.number()
              .required("Unit price is required")
              .positive("Unit price must be positive"),
            igst: Yup.number().required("IGST is required").min(0, "IGST cannot be negative")
          })
        )
        .min(1, "At least one item is required")
    }),

    // Empty object for additional sections (if required)
    Yup.object({})
  ];

  const initialValues = {

    orderDetails: {
      shipment_type: "A",
      actual_weight: "30",
      length: "2",
      breadth: "2",
      height: "2",
      invoice_no: "2345",
      invoice_date: "2023-01-01",
      invoice_currency: "ruppe",
      order_ref_id: "12323",
      ioss_number: "123",
      address1: "123 Main St",
      address2: "Apt 5",
      city: "New York",
      state: "NY",
      pincode: "10001",
      country: "USA",
    },
    itemDetails: [
      {
        product_name: "apple",
        sku: "s23",
        hsn: "12345678",
        quantity: "34",
        unit_price: "2",
        igst: "5",
      },
    ],
  };
  console.log(initialValues); 
console.log(validationSchemas[activeStep]); 

  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
  }));

  const handleSubmit = async (values, { setSubmitting }) => {
    if (activeStep < 3) {
      handleNext();
    } else {
      try {
        const payload = await dispatch(createOrderAsync(values)).unwrap();
        console.log(payload); 
        enqueueSnackbar("Order created successfully!", { variant: "success" });
        openModal({
          title: "Order Placed Successfully",
          message: "Your order has been placed successfully!",
          type: "success",
        });

        // navigate(state?.from || "/");
      } catch (error) {
        enqueueSnackbar(error.message || "Failed to create the order. Please try again.", {
          variant: "error",
        });
        openModal({
          title: "Order Failed",
          message: error.message || "Failed to process your order. Please try again.",
          type: "error",
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <>
    
    
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Order", path: "/order/create" }, { name: "Create Order" }]}
        />
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[activeStep]}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {/* Stepper & Form Layout */}
            <Grid container spacing={1} sx={{ marginTop: 2 }}>
              {/* Left Side - Stepper */}
              <Grid size={{ md: 3, xs: 12 }} sx={{ padding: 2 }}>
                <Paper elevation={1} sx={{ padding: 2, height: "100%" }}>
                  <OrderStepper activeStep={activeStep} />
                </Paper>
              </Grid>

              {/* Right Side - Form Content */}
              <Grid size={{ md: 9, xs: 12 }} sx={{ padding: 2 }}>
                <Paper elevation={1} sx={{ padding: 3 }}>
                  <Box>
                    {/* Step 1: Buyer Details */}
                    {activeStep === 0 && (
                      <>
                        {/* <Typography variant="h6" gutterBottom>
                          Select Pickup Address
                        </Typography> */}
                        {/* <Grid item xs={12} marginBottom={2}>
                          <Field
                            as={TextField}
                            fullWidth
                            name="pickupAddress"
                            label="Select Pickup Address"
                            error={touched.pickupAddress && Boolean(errors.pickupAddress)}
                            helperText={touched.pickupAddress && errors.pickupAddress}
                          />
                        </Grid> */}
                        <Typography variant="h6" gutterBottom>
                          Address Details
                        </Typography>

                        <Grid size={{ md:12, xs: 12 }} marginTop={2}>
                          <Field
                            as={TextField}
                            fullWidth
                            name="orderDetails.country"
                            label="Country"
                            error={
                              touched.orderDetails?.country && Boolean(errors.orderDetails?.country)
                            }
                            helperText={
                              touched.orderDetails?.country && errors.orderDetails?.country
                            }
                          />
                        </Grid>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 2,
                            mt: 2
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Field
                              as={TextField}
                              name="orderDetails.address1"
                              label="Address 1"
                              error={
                                touched.orderDetails?.address1 &&
                                Boolean(errors.orderDetails?.address1)
                              }
                              helperText={
                                touched.orderDetails?.address1 && errors.orderDetails?.address1
                              }
                              fullWidth
                            />
                          </Box>

                          <Box sx={{ flex: 1 }}>
                            <Field
                              as={TextField}
                              name="orderDetails.locality"
                              label="Landmark"
                              error={
                                touched.orderDetails?.locality &&
                                Boolean(errors.orderDetails?.locality)
                              }
                              helperText={
                                touched.orderDetails?.locality && errors.orderDetails?.locality
                              }
                              fullWidth
                            />
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 2,
                            mt: 2
                          }}
                        >
                          {/* Single Column: Address */}
                          <Box sx={{ flex: 1 }}>
                            <Field
                              as={TextField}
                              name="orderDetails.address2"
                              label="Address 2"
                              error={
                                touched.orderDetails?.address2 &&
                                Boolean(errors.orderDetails?.address2)
                              }
                              helperText={
                                touched.orderDetails?.address2 && errors.orderDetails?.address2
                              }
                              fullWidth
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 2,
                            mt: 2
                          }}
                        >
                          {/* Pincode */}
                          <Box sx={{ flex: 1 }}>
                            <Field
                              as={TextField}
                              name="orderDetails.pincode"
                              label="Pincode"
                              error={
                                touched.orderDetails?.pincode &&
                                Boolean(errors.orderDetails?.pincode)
                              }
                              helperText={
                                touched.orderDetails?.pincode && errors.orderDetails?.pincode
                              }
                              fullWidth
                            />
                          </Box>

                          {/* City */}
                          <Box sx={{ flex: 1 }}>
                            <Field
                              as={TextField}
                              name="orderDetails.city"
                              label="City"
                              error={
                                touched.orderDetails?.city && Boolean(errors.orderDetails?.city)
                              }
                              helperText={touched.orderDetails?.city && errors.orderDetails?.city}
                              fullWidth
                            />
                          </Box>

                          {/* State */}
                          <Box sx={{ flex: 1 }}>
                            <Field
                              as={TextField}
                              name="orderDetails.state"
                              label="State"
                              error={
                                touched.orderDetails?.state && Boolean(errors.orderDetails?.state)
                              }
                              helperText={touched.orderDetails?.state && errors.orderDetails?.state}
                              fullWidth
                            />
                          </Box>
                        </Box>
                      </>
                    )}

                    {/* Step 2: Order Details */}
                    {activeStep === 1 && (
                      <>
                        <Typography variant="h6" gutterBottom>
                          Shipment Type
                        </Typography>

                        <Typography variant="body2" color="textSecondary" fontSize={14}>
                          Please select the shipment Mode. Note: CSB-V Shipments can only be sent
                          through ShipGlobal Direct. If other partner services are needed, please
                          select CSB IV.
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          fontSize={14}
                          gutterBottom
                          mb={2}
                        >
                          If you need more info, please call/WhatsApp at +91 9811098919.
                        </Typography>

                        <Grid container spacing={2} mt={2}>
                          {/* CSB IV Option */}
                          <Grid size={{ md: 6, xs: 12 }}>
                            <Card
                              variant="outlined"
                              style={{
                                border:
                                  selectedType === "CSB IV"
                                    ? "2px solid #46b971"
                                    : "1px solid #ccc",
                                cursor: "pointer",
                                backgroundColor: selectedType === "CSB IV" ? "#E3F2FD" : "#f9f9f9"
                              }}
                              onClick={() => handleSelection("CSB IV")}
                            >
                              <CardContent>
                                <Grid container alignItems="center" spacing={2}>
                                  <Grid size>
                                    <PersonIcon
                                      fontSize="large"
                                      color={selectedType === "CSB IV" ? "primary" : "inherit"}
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Typography variant="h6">CSB IV</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      Non-Commercial Mode
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      Minimum Documentation
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      All Service Providers
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Radio checked={selectedType === "CSB IV"} color="primary" />
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>

                          {/* CSB V Option */}
                          <Grid size={{ md: 6, xs: 12 }}>
                            <Card
                              variant="outlined"
                              style={{
                                border:
                                  selectedType === "CSB V" ? "2px solid #46b971" : "1px solid #ccc",
                                cursor: "pointer",
                                backgroundColor: selectedType === "CSB V" ? "#E3F2FD" : "#f9f9f9"
                              }}
                              onClick={() => handleSelection("CSB V")}
                            >
                              <CardContent>
                                <Grid container alignItems="center" spacing={2}>
                                  <Grid item>
                                    <BusinessIcon
                                      fontSize="large"
                                      color={selectedType === "CSB V" ? "primary" : "inherit"}
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Typography variant="h6">CSB V</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      Commercial Mode
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      Valid Export Documents Required
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      Only ShipGlobal Direct
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Radio checked={selectedType === "CSB V"} color="primary" />
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>

                        <Typography variant="h6" gutterBottom mt={2}>
                          Shipment Details
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid size={{ md: 3, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="orderDetails.actual_weight"
                              label="Actual weight (kg)"
                              type="number"
                              error={
                                touched.orderDetails?.actual_weight &&
                                Boolean(errors.orderDetails?.actual_weight)
                              }
                              helperText={
                                touched.orderDetails?.actual_weight &&
                                errors.orderDetails?.actual_weight
                              }
                            />
                          </Grid>
                          <Grid size={{ md: 3, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="orderDetails.length"
                              type="number"
                              label="Length (cm)"
                              error={
                                touched.orderDetails?.length &&
                                Boolean(errors.orderDetails?.length)
                              }
                              helperText={
                                touched.orderDetails?.length && errors.orderDetails?.length
                              }
                            />
                          </Grid>
                          <Grid size={{ md: 3, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              type="number"
                              name="orderDetails.breadth"
                              label="Breadth (cm)"
                              error={
                                touched.orderDetails?.breadth &&
                                Boolean(errors.orderDetails?.breadth)
                              }
                              helperText={
                                touched.orderDetails?.breadth && errors.orderDetails?.breadth
                              }
                            />
                          </Grid>
                          <Grid size={{ md: 3, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              type="number"
                              name="orderDetails.height"
                              label="Height (cm)"
                              error={
                                touched.orderDetails?.height &&
                                Boolean(errors.orderDetails?.height)
                              }
                              helperText={
                                touched.orderDetails?.height && errors.orderDetails?.height
                              }
                            />
                          </Grid>
                        </Grid>

                        <Typography variant="h6" gutterBottom mt={2}>
                          Order Details
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid size={{ md: 3, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="orderDetails.invoice_no"
                              label="Invoice No."
                              error={
                                touched.orderDetails?.invoice_no &&
                                Boolean(errors.orderDetails?.invoice_no)
                              }
                              helperText={
                                touched.orderDetails?.invoice_no && errors.orderDetails?.invoice_no
                              }
                            />
                          </Grid>
                          <Grid size={{ md: 3, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              type="date"
                              name="orderDetails.invoice_date"
                              label=""
                              error={
                                touched.orderDetails?.invoice_date &&
                                Boolean(errors.orderDetails?.invoice_date)
                              }
                              helperText={
                                touched.orderDetails?.invoice_date &&
                                errors.orderDetails?.invoice_date
                              }
                            />
                          </Grid>
                          {/* <Autocomplete
                            sx={{ width: 270 }}
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={top100Films.map((option) => option.title)}
                            renderInput={(params) => (
                              <Field
                                as={TextField}
                                {...params}
                                label="Search input"
                                slotProps={{
                                  input: {
                                    ...params.InputProps,
                                    type: "search"
                                  }
                                }}
                              />
                            )}
                          /> */}
                          <Grid size={{ md: 3, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="orderDetails.order_ref_id"
                              label="Order Id/Ref. Id"
                              error={
                                touched.orderDetails?.order_ref_id &&
                                Boolean(errors.orderDetails?.order_ref_id)
                              }
                              helperText={
                                touched.orderDetails?.order_ref_id &&
                                errors.orderDetails?.order_ref_id
                              }
                            />
                          </Grid>

                          <Grid size={{ md: 3, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="orderDetails.ioss_number"
                              label="IOSS Number:"
                              error={
                                touched.orderDetails?.ioss_number &&
                                Boolean(errors.orderDetails?.ioss_number)
                              }
                              helperText={
                                touched.orderDetails?.ioss_number &&
                                errors.orderDetails?.ioss_number
                              }
                            />
                          </Grid>
                        </Grid>

                        <Typography variant="h6" gutterBottom mt={2}>
                          Item Details
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid size={{ md: 3, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="itemDetails.product_name"
                              label="Product Name"
                              error={
                                touched.itemDetails?.product_name &&
                                Boolean(errors.itemDetails?.product_name)
                              }
                              helperText={
                                touched.itemDetails?.product_name && errors.itemDetails?.product_name
                              }
                            />
                          </Grid>
                          <Grid size={{ md: 2, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="itemDetails.sku"
                              label="SKU"
                              error={
                                touched.itemDetails?.sku && Boolean(errors.itemDetails?.sku)
                              }
                              helperText={touched.itemDetails?.sku && errors.itemDetails?.sku}
                            />
                          </Grid>
                          <Grid size={{ md: 3, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="itemDetails.hsn"
                              label="HSN Code"
                              error={
                                touched.itemDetails?.hsn &&
                                Boolean(errors.itemDetails?.hsn)
                              }
                              helperText={touched.itemDetails?.hsn && errors.itemDetails?.hsn}
                            />
                          </Grid>
                          <Grid size={{ md: 2, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="itemDetails.quantity"
                              label="Quantity"
                              type="number"
                              error={
                                touched.itemDetails?.quantity &&
                                Boolean(errors.itemDetails?.quantity)
                              }
                              helperText={
                                touched.itemDetails?.quantity && errors.itemDetails?.quantity
                              }
                            />
                          </Grid>
                          <Grid size={{ md: 2, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="itemDetails.unit_price"
                              label="Unit Price(INR)"
                              type="number"
                              error={
                                touched.itemDetails?.unit_price &&
                                Boolean(errors.itemDetails?.unit_price)
                              }
                              helperText={
                                touched.itemDetails?.unit_price && errors.itemDetails?.unit_price
                              }
                            />
                          </Grid>
                          <Grid size={{ md: 2, xs: 12 }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="itemDetails.isgst"
                              label="IGST"
                              type="number"
                              error={
                                touched.itemDetails?.isgst &&
                                Boolean(errors.itemDetails?.isgst)
                              }
                              helperText={
                                touched.itemDetails?.isgst && errors.itemDetails?.isgst
                              }
                            />
                          </Grid>
                        </Grid>
                      </>
                    )}

                    {/* Step 3: Shipping Partner */}
                    {activeStep === 2 && (
                      <>
                        <Typography variant="h6" gutterBottom>
                          Shipping Partner
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="shippingPartner"
                              label="Shipping Partner"
                              error={
                                touched.shippingPartner &&
                                Boolean(errors.shippingPartner)
                              }
                              helperText={touched.shippingPartner && errors.shippingPartner}
                            />
                          </Grid>
                        </Grid>
                      </>
                    )}

                    {/* Step 4: Review */}
                    {activeStep === 3 && (
                      <>
                        <Typography variant="h6" gutterBottom>
                          Confirm and Place Order
                        </Typography>
                        <Typography>Please review your details before submitting.</Typography>
                      </>
                    )}
                  </Box>

                  {/* Navigation Buttons */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                    {activeStep > 0 && (
                      <Button variant="outlined" onClick={handleBack}>
                        Back
                      </Button>
                    )}
                    <Button variant="contained" color="primary" type="submit">
                      {activeStep === 3 ? "Submit Order" : "Continue"}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
    <OrderStatusModal open={modalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
};

export default CreateOrderForm;
