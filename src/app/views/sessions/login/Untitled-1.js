import React from "react";
import { Box, Card, Grid, Typography, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

const RootContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #ffffff, #e6f7ff)",
  padding: theme.spacing(2)
}));

const LoginCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "900px",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius * 2,
  overflow: "hidden",
  [theme.breakpoints.up("md")]: { flexDirection: "row" }
}));

const LeftSection = styled(Box)(({ theme }) => ({
  flex: 1,
  background: "url('/assets/images/image3.png') no-repeat center center/cover",
  minHeight: "400px",
  [theme.breakpoints.up("md")]: { minHeight: "500px" }
}));

const RightSection = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "2rem",
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main
}));

const FooterText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  textAlign: "center",
  fontSize: "0.9rem",
  "& a": {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontWeight: 500
  }
}));

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required")
});

const initialValues = {
  email: "",
  password: ""
};

const handleFormSubmit = async (values, { setSubmitting }) => {
  try {
    // Simulate API call
    console.log("Form Submitted", values);
    setSubmitting(false);
  } catch (error) {
    console.error("Login error", error);
    setSubmitting(false);
  }
};

const Login = () => {
  return (
    <RootContainer>
      <LoginCard>
        <Grid container>
          <Grid item md={6} xs={12}>
            <LeftSection />
          </Grid>

          <Grid item md={6} xs={12}>
            <RightSection>
              <Title>Welcome Back!</Title>
              <Typography variant="body2" color="textSecondary" mb={4}>
                Please log in to continue managing your account.
              </Typography>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      margin="normal"
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      margin="normal"
                    />

                    <LoadingButton
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      loading={isSubmitting}
                      sx={{ mt: 2, mb: 2 }}
                    >
                      Log In
                    </LoadingButton>
                  </form>
                )}
              </Formik>

              <FooterText>
                Don&apos;t have an account? <NavLink to="/register">Register Now</NavLink>
              </FooterText>
            </RightSection>
          </Grid>
        </Grid>
      </LoginCard>
    </RootContainer>
  );
};

export default Login;
