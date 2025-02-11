import React from "react";
import { Stepper, Step, StepLabel, StepConnector } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import ErrorIcon from "@mui/icons-material/ErrorOutline";

// Styled StepConnector for custom line styling
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  "& .MuiStepConnector-line": {
    borderColor: theme.palette.primary.light,
    borderWidth: 2,
  },
}));

// Custom StepIcon component
const StepIconRoot = styled("div")(({ theme, ownerState }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  width: 32,
  height: 32,
  color: ownerState.completed
    ? theme.palette.success.main
    : theme.palette.primary.light,
  backgroundColor: ownerState.active
    ? theme.palette.primary.main
    : theme.palette.grey[200],
  borderRadius: "50%",
  boxShadow: ownerState.active
    ? `0 0 8px ${theme.palette.primary.light}`
    : "none",
}));

// Render custom step icons
const CustomStepIcon = (props) => {
  const { active, completed, error } = props;

  return (
    <StepIconRoot ownerState={{ active, completed }}>
      {error ? (
        <ErrorIcon style={{ color: "red" }} />
      ) : completed ? (
        <CheckCircleIcon style={{ color: "white" }} />
      ) : (
        <CircleIcon style={{ color: "white" }} />
      )}
    </StepIconRoot>
  );
};

// Styled Stepper Container
const StepperContainer = styled(Stepper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: "transparent",
  "& .MuiStepLabel-label": {
    fontWeight: 500,
    fontSize: "1rem",
    color: theme.palette.text.secondary,
  },
  "& .MuiStepLabel-label.Mui-active": {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  "& .MuiStepLabel-label.Mui-completed": {
    color: theme.palette.success.dark,
  },
}));

const steps = ["Address Details", "Order Details", "Shipping Partner", "Place Order"];

const OrderStepper = ({ activeStep, errorStep }) => {
  return (
    <StepperContainer
      activeStep={activeStep}
      orientation="vertical"
      connector={<CustomStepConnector />}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={(props) => (
              <CustomStepIcon {...props} error={errorStep === index} />
            )}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </StepperContainer>
  );
};

export default OrderStepper;
