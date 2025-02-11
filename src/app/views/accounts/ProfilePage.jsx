import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  Button,
  Avatar,
  Divider,
  Box,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetails } from "app/features/profile/profileSlice";
import UpdateProfileModal from "app/components/UpdateProfileModal";
import UpdateKYCModal from "app/components/KYCModal";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.profile);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isKYCModalOpen, setKYCModalOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getProfileDetails());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  const handleUpdate = (updatedData) => {
    console.log("Updated Data:", updatedData);
  };

  const handleKYCUpdate = (kycData) => {
    console.log("Updated KYC Data:", kycData);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
            <Avatar
              alt="Profile Picture"
              src={user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
              sx={{ width: 120, height: 120, margin: "0 auto" }}
            />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              {user?.full_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.accountType} Account
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2, marginRight: 1 }}
              onClick={() => setModalOpen(true)}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 2, marginLeft: 1 }}
              onClick={() => setKYCModalOpen(true)}
            >
              Update KYC
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Profile Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  KYC Status:
                </Typography>
                <Chip
                  label={user?.kyc_status}
                  icon={<CheckCircle color="success" />}
                  color="success"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  Account Type:
                </Typography>
                <Typography variant="body1">{user?.accountType}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Contact Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  Mobile Number:
                </Typography>
                <Typography variant="body1">{user?.mobile_no}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  Email:
                </Typography>
                <Typography variant="body1">{user?.email}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Aadhar Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  Aadhar Number:
                </Typography>
                <Typography variant="body1">{user?.Aadhaar_Number}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button variant="text" size="small" color="primary">
                  Download Aadhar Front
                </Button>
                <Button variant="text" size="small" color="primary">
                  Download Aadhar Back
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Pan Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  PAN Number:
                </Typography>
                <Typography variant="body1">{user?.PAN_Number}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button variant="text" size="small" color="primary">
                  Download PAN
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Billing Address
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Registered Business Address:
            </Typography>
            <Typography variant="body1">{user?.address1+" "+user?.address2+" "+user?.city +" "+user?.state +" "+user?.pincode + " "+user?.country}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <UpdateProfileModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        profileData={user}
        onUpdate={handleUpdate}
      />

      <UpdateKYCModal
        open={isKYCModalOpen}
        onClose={() => setKYCModalOpen(false)}
        onKYCUpdate={handleKYCUpdate}
      />
    </Box>
  );
};

export default ProfilePage;
