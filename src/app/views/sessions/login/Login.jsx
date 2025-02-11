import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Formik } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "app/features/auth/authSlice";

const Title = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontWeight: 700,
  fontSize: "2rem",
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
}));

const FooterText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  textAlign: "center",
  fontSize: "1rem",
  "& a": {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontWeight: 600,
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  height: "100vh",
  backgroundColor: "#45B771",
  color: "#ffffff",
  padding: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    height: "auto",
    padding: theme.spacing(2),
  },
}));

const Image = styled("img")({
  maxWidth: "80%",
  height: "auto",
});

const Tagline = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  fontSize: "3.5rem",
  fontWeight: 200,
  textAlign: "start",
  fontStyle: "italic",
  textAlign:"start",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));



const SubTagline = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontSize: "3.5rem",
  fontWeight: 200,
  fontStyle: "italic",
  opacity: 0.6,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));


const FormContainer = styled(Box)(({ theme }) => ({
  
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  height: "100vh",
  padding: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    height: "auto",
    padding: theme.spacing(2),
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  display: "flex",
  alignItems: "center",
}));

const LogoImage = styled("img")({
  width: 60,
  height: 60,
});

// const LogoText = styled(Typography)(({ theme }) => ({
//   fontWeight: 700,
//   fontSize: "1.5rem",
//   color: "#000",
// }));
// const LogoText2 = styled(Typography)(({ theme }) => ({
//   fontWeight: 700,
//   fontSize: "1.5rem",
//   color: theme.palette.primary.main
// }));

const initialValues = {
  username: "aman@gmail.com",
  password: "Password@123",
  // remember: true,
};


const validationSchema = Yup.object().shape({
  
  username: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required!"),
});

export default function Login() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  
  const authState = useSelector((state) => state.auth); 

  const dispatch = useDispatch();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUserAsync(values)).unwrap();
      enqueueSnackbar("Login successful!", { variant: "success" });
      
      console.log("State before navigation:", state);
      navigate(state?.from || "/");
    } catch (error) {
      enqueueSnackbar(error.message || "Login failed!", { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };
  

 


  return (
    <Grid container>
      <Grid
        size={{ xs: 12, md: 6 }}
        style={{
          backgroundColor: "#45B771",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageContainer>
          <Image src="/assets/images/image3.png" alt="Courier Illustration" />
          <Tagline>
            Secure Access to <br /> Your Courier
            <br />
            <SubTagline>Tracking Dashboard</SubTagline>
          </Tagline>
        </ImageContainer>
      </Grid>
      

      <Grid
        size={{ xs: 12, md: 6  }}
       
      >
        <Grid container  style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }} >
           <LogoContainer>
    <LogoImage src="/assets/images/logoPax.png" alt="Pax Freight Logo" />
    
  </LogoContainer>
          
          
          
        <FormContainer>
          
          
          <Stack alignItems={"start"} width="100%" spacing={2}>
            
            <Title> Welcome Back</Title>
           
           
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
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
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
          </Stack>

          <FooterText>
            Don&apos;t have an account?{" "}
            <NavLink to="/register">Register Now</NavLink>
          </FooterText>
        </FormContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}
``
