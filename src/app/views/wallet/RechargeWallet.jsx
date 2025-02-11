import React, { useState } from "react";
import {
  Box,
  styled,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Breadcrumb } from "app/components";

const RechargeWallet = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const steps = ["Enter Amount", "Select Payment"];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
  }));

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Wallet", path: "/wallet" }, { name: "" }]} />
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          mt: 5,
          p: 3,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          backgroundColor: "#f9f9f9"
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Recharge Wallet
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>
          {activeStep === 0 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Enter Recharge Amount
              </Typography>
              <TextField
                fullWidth
                label="Recharge Amount (₹)"
                type="number"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleNext}>
                Continue to payment
              </Button>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Choose Payment Method
              </Typography>
              <FormControl component="fieldset" sx={{ width: "100%" }}>
                <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
                  <Card
                    sx={{
                      mb: 2,
                      border: paymentMethod === "PayTM" ? "2px solid #46b971" : "1px solid #e0e0e0"
                    }}
                  >
                    <CardContent>
                      <FormControlLabel
                        value="PayTM"
                        control={<Radio />}
                        label="PayTM (Wallet, Credit/Debit Card, UPI)"
                      />
                    </CardContent>
                  </Card>
                  <Card
                    sx={{
                      mb: 2,
                      border:
                        paymentMethod === "CashFree" ? "2px solid #46b971" : "1px solid #e0e0e0"
                    }}
                  >
                    <CardContent>
                      <FormControlLabel
                        value="CashFree"
                        control={<Radio />}
                        label="CashFree (Credit/Debit Card, UPI)"
                      />
                    </CardContent>
                  </Card>
                </RadioGroup>
              </FormControl>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ md: 6, xs: 12 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleBack}
                    sx={{ textTransform: "none" }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ textTransform: "none" }}
                  >
                    Pay ₹{rechargeAmount || "0"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default RechargeWallet;
