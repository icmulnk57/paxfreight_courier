import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "app/features/profile/profileSlice"; 
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid } from "@mui/material";

const UpdateProfileModal = ({ open, onClose, profileData }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.profile);
  
  const [formData, setFormData] = useState(profileData);

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    dispatch(updateProfile(formData));
    enqueueSnackbar("Profile updated successfully", { variant: "success" });
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="full_name"
              value={formData.full_name || ""}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Account Type"
              name="accountType"
              value={formData.accountType || ""}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile_no"
              value={formData.mobile_no || ""}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Billing Address"
              name="address1"
              value={formData.address1 || ""}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={status === "loading"}>
          {status === "loading" ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProfileModal;
