import { Box, Button, Modal, Typography } from "@mui/material";

const OrderStatusModal = ({ open, onClose, content }) => {
    const { title, message, type } = content;
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Typography sx={{ mb: 3 }}>{message}</Typography>
          <Button
            variant="contained"
            color={type === "success" ? "success" : "error"}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Modal>
    );
  };
  

  export default OrderStatusModal;

  