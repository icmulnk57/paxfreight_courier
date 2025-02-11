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
import { Delete } from "@mui/icons-material";

const MultiBoxOrder = () => {
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

  const validationSchemas = [
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
        country: Yup.string().required("Country is required")
      })
    }),

    // Item Details Validation
    Yup.object({
      boxes: Yup.array()
        .of(
          Yup.object({
            boxDetails: Yup.object({
              box_id: Yup.string().required("Box ID is required"),
              weight: Yup.number().required("Weight is required").positive().min(0.1),
              length: Yup.number().required("Length is required").positive(),
              breadth: Yup.number().required("Breadth is required").positive(),
              height: Yup.number().required("Height is required").positive()
            }),
            items: Yup.array()
              .of(
                Yup.object({
                  product_name: Yup.string().required("Product name is required"),
                  sku: Yup.string().required("SKU is required"),
                  hsn: Yup.string().required("HSN is required"),
                  quantity: Yup.number().required("Quantity is required").positive().integer(),
                  unit_price: Yup.number().required("Unit price is required").positive(),
                  igst: Yup.number().required("IGST is required").min(0)
                })
              )
              .min(1, "At least one item is required")
          })
        )
        .min(1, "At least one box is required")
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
      country: "USA"
    },
    boxes: [
      {
        boxDetails: {
          box_id: "Box 1",
          weight: "10",
          length: "20",
          breadth: "20",
          height: "20"
        },
        items: [
          {
            product_name: "apple",
            sku: "s23",
            hsn: "12345678",
            quantity: "34",
            unit_price: "2",
            igst: "5"
          }
        ]
      }
    ]
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
          type: "success"
        });

        // navigate(state?.from || "/");
      } catch (error) {
        enqueueSnackbar(error.message || "Failed to create the order. Please try again.", {
          variant: "error"
        });
        openModal({
          title: "Order Failed",
          message: error.message || "Failed to process your order. Please try again.",
          type: "error"
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const addBox = (values, setValues) => {
    const newBox = {
      boxDetails: {
        box_id: `Box ${values.boxes.length + 1}`,
        weight: "",
        length: "",
        breadth: "",
        height: ""
      },
      items: [
        {
          product_name: "",
          sku: "",
          hsn: "",
          quantity: "",
          unit_price: "",
          igst: ""
        }
      ]
    };
    setValues({ ...values, boxes: [...values.boxes, newBox] });
  };
  const addItem = (values, setValues, boxIndex) => {
    const newItem = {
      product_name: "",
      sku: "",
      hsn: "",
      quantity: "",
      unit_price: "",
      igst: ""
    };
    const updatedBoxes = [...values.boxes];
    updatedBoxes[boxIndex].items.push(newItem);
    setValues({ ...values, boxes: updatedBoxes });
  };

  const removeItem = (values, setValues, boxIndex, itemIndex) => {
    const updatedBoxes = [...values.boxes];
    updatedBoxes[boxIndex].items = updatedBoxes[boxIndex].items.filter(
      (_, index) => index !== itemIndex
    );
    setValues({ ...values, boxes: updatedBoxes });
  };

  const removeBox = (values, setValues, boxIndex) => {
    const updatedBoxes = values.boxes.filter((_, index) => index !== boxIndex);
    setValues({ ...values, boxes: updatedBoxes });
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
          {({ errors, touched, values, setValues }) => (
            <Form>
              {/* Stepper & Form Layout */}
              <Grid container spacing={1} sx={{ marginTop: 2 }}>
                {/* Left Side - Stepper */}
                <Grid item xs={12} md={3} sx={{ padding: 2 }}>
                  <Paper elevation={1} sx={{ padding: 2, height: "100%" }}>
                    <OrderStepper activeStep={activeStep} />
                  </Paper>
                </Grid>

                {/* Right Side - Form Content */}
                <Grid item xs={12} md={9} sx={{ padding: 2, width: "calc(100% - 23%)" }}>
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

                          <Grid container spacing={2} sx={{ marginTop: 2 }}></Grid>

                          <Grid size={{ md: 12 }} marginTop={2}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="orderDetails.country"
                              label="Country"
                              error={
                                touched.orderDetails?.country &&
                                Boolean(errors.orderDetails?.country)
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
                                helperText={
                                  touched.orderDetails?.state && errors.orderDetails?.state
                                }
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
                            <Grid item xs={12} md={6}>
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
                                    <Grid item>
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
                            <Grid item xs={12} md={6}>
                              <Card
                                variant="outlined"
                                style={{
                                  border:
                                    selectedType === "CSB V"
                                      ? "2px solid #46b971"
                                      : "1px solid #ccc",
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
                                  touched.orderDetails?.invoice_no &&
                                  errors.orderDetails?.invoice_no
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

                            <Grid>
                              <Field
                                as={TextField}
                                fullWidth
                                name="orderDetails.invoice_currency"
                                label="Invoice Currency"
                                error={
                                  touched.orderDetails?.invoice_currency &&
                                  Boolean(errors.orderDetails?.invoice_currency)
                                }
                                helperText={
                                  touched.orderDetails?.invoice_currency &&
                                  errors.orderDetails?.invoice_currency
                                }
                              />
                            </Grid>
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

                            <Grid>
                              <Field
                                as={TextField}
                                fullWidth
                                name="orderDetails.totalboxes"
                                label="Total Boxes"
                                type="number"
                                error={
                                  touched.orderDetails?.totalboxes &&
                                  Boolean(errors.orderDetails?.totalboxes)
                                }
                                helperText={
                                  touched.orderDetails?.totalboxes &&
                                  errors.orderDetails?.totalboxes
                                }
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={2}>
                            {values.boxes.map((box, boxIndex) => (
                              <Box
                                key={boxIndex}
                                sx={{
                                  marginBottom: 4,
                                  marginTop: 2,
                                  border: "1px solid #ccc",
                                  borderRadius: 1
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderBottom: "1px solid #ccc",
                                    paddingBottom: 1,
                                    padding: 2
                                  }}
                                >
                                  <Typography variant="h6" gutterBottom>
                                    Box Details {boxIndex + 1}
                                  </Typography>

                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => removeBox(values, setValues, boxIndex)}
                                  >
                                    <Delete />
                                  </Button>
                                </Box>

                                <Grid container spacing={2} ml={2} mt={4}>
                                  <Grid item xs={12} md={3}>
                                    <Field
                                      as={TextField}
                                      fullWidth
                                      name={`boxes[${boxIndex}].boxDetails.weight`}
                                      label=" Actual Weight (kg)"
                                      type="number"
                                      error={
                                        touched.boxes?.[boxIndex]?.boxDetails?.weight &&
                                        Boolean(errors.boxes?.[boxIndex]?.boxDetails?.weight)
                                      }
                                      helperText={
                                        touched.boxes?.[boxIndex]?.boxDetails?.weight &&
                                        errors.boxes?.[boxIndex]?.boxDetails?.weight
                                      }
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={3}>
                                    <Field
                                      as={TextField}
                                      fullWidth
                                      name={`boxes[${boxIndex}].boxDetails.length`}
                                      label="Length (cm)"
                                      type="number"
                                      error={
                                        touched.boxes?.[boxIndex]?.boxDetails?.length &&
                                        Boolean(errors.boxes?.[boxIndex]?.boxDetails?.length)
                                      }
                                      helperText={
                                        touched.boxes?.[boxIndex]?.boxDetails?.length &&
                                        errors.boxes?.[boxIndex]?.boxDetails?.length
                                      }
                                    />
                                  </Grid>
                                  <Grid>
                                    <Field
                                      as={TextField}
                                      fullWidth
                                      name={`boxes[${boxIndex}].boxDetails.breadth`}
                                      label="Breadth (cm)"
                                      type="number"
                                      error={
                                        touched.boxes?.[boxIndex]?.boxDetails?.breadth &&
                                        Boolean(errors.boxes?.[boxIndex]?.boxDetails?.breadth)
                                      }
                                      helperText={
                                        touched.boxes?.[boxIndex]?.boxDetails?.breadth &&
                                        errors.boxes?.[boxIndex]?.boxDetails?.breadth
                                      }
                                    />
                                  </Grid>
                                  <Grid>
                                    <Field
                                      as={TextField}
                                      fullWidth
                                      name={`boxes[${boxIndex}].boxDetails.height`}
                                      label="Height (cm)"
                                      type="number"
                                      error={
                                        touched.boxes?.[boxIndex]?.boxDetails?.height &&
                                        Boolean(errors.boxes?.[boxIndex]?.boxDetails?.height)
                                      }
                                      helperText={
                                        touched.boxes?.[boxIndex]?.boxDetails?.height &&
                                        errors.boxes?.[boxIndex]?.boxDetails?.height
                                      }
                                    />
                                  </Grid>
                                </Grid>

                                <Typography variant="h6" gutterBottom mt={2} ml={2}>
                                  Item(s) Details {boxIndex + 1}
                                </Typography>
                                <Grid container spacing={3} ml={2} mb={2}>
                                  {box.items.map((item, itemIndex) => (
                                    <Grid container spacing={2} key={itemIndex}>
                                      <Grid item xs={12} md={3}>
                                        <Field
                                          as={TextField}
                                          fullWidth
                                          name={`boxes[${boxIndex}].items[${itemIndex}].product_name`}
                                          label="Product Name"
                                          error={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]
                                              ?.product_name &&
                                            Boolean(
                                              errors.boxes?.[boxIndex]?.items?.[itemIndex]
                                                ?.product_name
                                            )
                                          }
                                          helperText={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]
                                              ?.product_name &&
                                            errors.boxes?.[boxIndex]?.items?.[itemIndex]
                                              ?.product_name
                                          }
                                        />
                                      </Grid>
                                      {/* Add more fields for SKU, HSN, Quantity, Unit Price, IGST */}
                                      <Grid item xs={12} md={3}>
                                        <Field
                                          as={TextField}
                                          fullWidth={false}
                                          style={{ width: "80px" }}
                                          name={`boxes[${boxIndex}].items[${itemIndex}].sku`}
                                          label="SKU"
                                          error={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]?.sku &&
                                            Boolean(
                                              errors.boxes?.[boxIndex]?.items?.[itemIndex]?.sku
                                            )
                                          }
                                          helperText={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]?.sku &&
                                            errors.boxes?.[boxIndex]?.items?.[itemIndex]?.sku
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12} md={3}>
                                        <Field
                                          as={TextField}
                                          fullWidth={false}
                                          style={{ width: "100px" }}
                                          name={`boxes[${boxIndex}].items[${itemIndex}].hsn`}
                                          label="HSN"
                                          error={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]?.hsn &&
                                            Boolean(
                                              errors.boxes?.[boxIndex]?.items?.[itemIndex]?.hsn
                                            )
                                          }
                                          helperText={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]?.hsn &&
                                            errors.boxes?.[boxIndex]?.items?.[itemIndex]?.hsn
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12} md={3}>
                                        <Field
                                          as={TextField}
                                          fullWidth={false}
                                          style={{ width: "80px" }}
                                          name={`boxes[${boxIndex}].items[${itemIndex}].quantity`}
                                          label="Quantity"
                                          type="number"
                                          error={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]
                                              ?.quantity &&
                                            Boolean(
                                              errors.boxes?.[boxIndex]?.items?.[itemIndex]?.quantity
                                            )
                                          }
                                          helperText={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]
                                              ?.quantity &&
                                            errors.boxes?.[boxIndex]?.items?.[itemIndex]?.quantity
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12} md={3}>
                                        <Field
                                          as={TextField}
                                          fullWidth={false}
                                          style={{ width: "100px" }}
                                          name={`boxes[${boxIndex}].items[${itemIndex}].unit_price`}
                                          label="Unit Price (INR)"
                                          type="number"
                                          error={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]
                                              ?.unit_price &&
                                            Boolean(
                                              errors.boxes?.[boxIndex]?.items?.[itemIndex]
                                                ?.unit_price
                                            )
                                          }
                                          helperText={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]
                                              ?.unit_price &&
                                            errors.boxes?.[boxIndex]?.items?.[itemIndex]?.unit_price
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12} md={3}>
                                        <Field
                                          as={TextField}
                                          fullWidth
                                          name={`boxes[${boxIndex}].items[${itemIndex}].igst`}
                                          label="IGST"
                                          type="number"
                                          error={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]?.igst &&
                                            Boolean(
                                              errors.boxes?.[boxIndex]?.items?.[itemIndex]?.igst
                                            )
                                          }
                                          helperText={
                                            touched.boxes?.[boxIndex]?.items?.[itemIndex]?.igst &&
                                            errors.boxes?.[boxIndex]?.items?.[itemIndex]?.igst
                                          }
                                        />
                                      </Grid>
                                      
                                      <Button
                                        onClick={() => addItem(values, setValues, boxIndex)}
                                        sx={{ marginTop: 2, backgroundColor: "#fff" }}
                                      >
                                        + Add Item
                                      </Button>

                                      <Button
                                        sx={{ marginTop: 2 }}
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                          removeItem(values, setValues, boxIndex, itemIndex)
                                        }
                                      >
                                        <Delete />
                                      </Button>
                                    </Grid>
                                  ))}
                                </Grid>
                              </Box>
                            ))}
                            <Button
                              variant="outlined"
                              onClick={() => addBox(values, setValues)}
                              sx={{ marginTop: 2 }}
                            >
                              + Add Box
                            </Button>
                          </Grid>
                        </>
                      )}

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
                                error={touched.shippingPartner && Boolean(errors.shippingPartner)}
                                helperText={touched.shippingPartner && errors.shippingPartner}
                              />
                            </Grid>
                          </Grid>
                        </>
                      )}

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

export default MultiBoxOrder;
