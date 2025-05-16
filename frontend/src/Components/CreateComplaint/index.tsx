import React, { useState } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Divider,
  Grid,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateComplaint } from "../../Api/hooks/ComplaintHooks";
import { useQueryClient } from "@tanstack/react-query";
import {
  GET_COMPLAINT_BY_ID_QUERY_KEY,
  GET_COMPLAINT_PAGINATION,
} from "../../Api/constants";

interface CreateComplaintDialogProps {
  userId: string;
  onClose: () => void;
}

export const CreateComplaintDialog: React.FC<CreateComplaintDialogProps> = ({
  userId,
  onClose,
}) => {
  const [customer, setCustomer] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<number>(1);
  const [variant, setVariant] = useState<number>(1);

  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [GET_COMPLAINT_BY_ID_QUERY_KEY],
    });
    queryClient.invalidateQueries({
      queryKey: [GET_COMPLAINT_PAGINATION],
    });
  };

  const { mutate: createComplaint, error } = useCreateComplaint(onSuccess);

  const resetForm = () => {
    setCustomer("");
    setDescription("");
    setPriority(1);
    setVariant(1);
    setFormError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!customer.trim()) {
      setFormError("Customer name is required");
      return;
    }
    if (!description.trim()) {
      setFormError("Description is required");
      return;
    }

    const newComplaint = {
      customer,
      description,
      priority,
      complaintVariant: variant,
      createdUserId: userId,
      updatedUserId: userId,
      status: 1,
    };

    createComplaint(newComplaint, {
      onSuccess: () => {
        handleClose();
        if (onSuccess) {
          onSuccess();
        }
      },
    });
  };

  return (
    <>
      <DialogTitle
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Create New Complaint
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ px: 3, py: 2 }}>
        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            An error occurred while creating the complaint. Please try again.
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Customer Name"
              fullWidth
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              margin="normal"
              variant="outlined"
              required
              error={formError === "Customer name is required"}
              helperText={
                formError === "Customer name is required" ? formError : ""
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                label="Priority"
              >
                <MenuItem value={1}>Low</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={3}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Complaint Type</InputLabel>
              <Select
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                label="Complaint Type"
              >
                <MenuItem value={1}>Product</MenuItem>
                <MenuItem value={2}>Customer Service</MenuItem>
                <MenuItem value={3}>Delivery</MenuItem>
                <MenuItem value={4}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              variant="outlined"
              required
              multiline
              rows={4}
              error={formError === "Description is required"}
              helperText={
                formError === "Description is required" ? formError : ""
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ p: "0.5em" }}
        >
          Create Complaint
        </Button>
      </DialogActions>
    </>
  );
};
