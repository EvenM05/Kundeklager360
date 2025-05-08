import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Grid,
  Divider,
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { format } from "date-fns";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  useGetComplaintById,
  useUpdateComplaint,
} from "../../Api/hooks/ComplaintHooks";
import {
  priorityIntToEnum,
  statusIntToEnum,
  variantIntToEnum,
} from "../../Utils/Enums";
import { UpdateComplaintModel } from "../../Utils/interfaces/ComplaintInterfaces";
import {
  GET_COMPLAINT_BY_ID_QUERY_KEY,
  GET_COMPLAINT_PAGINATION,
} from "../../Api/constants";
import { useQueryClient } from "@tanstack/react-query";
import { usePostComment } from "../../Api/hooks/CommentHooks";
import { CreateCommentData } from "../../Utils/interfaces/CommentInterfaces";
import { retrieveFromStorage } from "../../Utils/localStorage";

export enum ComplaintVariant {
  Product = "Product",
  CustomerService = "CustomerService",
  Delivery = "Delivery",
  Other = "Other",
}

interface ComplaintDialogProps {
  complaintId: string;
  onClose: () => void;
}

const getStatusIcon = (status: number) => {
  switch (status) {
    case 1:
      return <FiberNewIcon />;
    case 2:
      return <HourglassEmptyIcon />;
    case 3:
      return <CheckCircleIcon />;
  }
};

const getStatusColor = (
  status: number,
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  switch (status) {
    case 1:
      return "info";
    case 2:
      return "warning";
    case 3:
      return "success";
    default:
      return "default";
  }
};

const getStatusLabel = (status: number): string => {
  switch (status) {
    case 1:
      return "New";
    case 2:
      return "Under Process";
    case 3:
      return "Completed";
    default:
      return "New";
  }
};

const getPriorityColor = (
  priority: number,
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  switch (priority) {
    case 1:
      return "success";
    case 2:
      return "warning";
    case 3:
      return "error";
    default:
      return "default";
  }
};

const getVariantIcon = (variant: ComplaintVariant) => {
  switch (variant) {
    case ComplaintVariant.Product:
      return <CategoryIcon />;
    case ComplaintVariant.CustomerService:
      return <SupportAgentIcon />;
    case ComplaintVariant.Delivery:
      return <LocalShippingIcon />;
    case ComplaintVariant.Other:
      return <HelpOutlineIcon />;
  }
};

const getVariantColor = (
  variant: ComplaintVariant,
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  switch (variant) {
    case ComplaintVariant.Product:
      return "primary";
    case ComplaintVariant.CustomerService:
      return "secondary";
    case ComplaintVariant.Delivery:
      return "info";
    case ComplaintVariant.Other:
      return "default";
  }
};

const stringToVariantEnum = (variantString: string): ComplaintVariant => {
  switch (variantString) {
    case "Product":
      return ComplaintVariant.Product;
    case "CustomerService":
      return ComplaintVariant.CustomerService;
    case "Delivery":
      return ComplaintVariant.Delivery;
    default:
      return ComplaintVariant.Other;
  }
};

export const ComplaintDialog = (props: ComplaintDialogProps) => {
  const { complaintId, onClose } = props;

  const [newComment, setNewComment] = useState<string>("");
  const [commentSectionExpanded, setCommentSectionExpanded] =
    useState<boolean>(true);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [GET_COMPLAINT_BY_ID_QUERY_KEY],
    });
    queryClient.invalidateQueries({
      queryKey: [GET_COMPLAINT_PAGINATION],
    });
  };

  const { data: complaintData } = useGetComplaintById(complaintId);
  const { mutate: handleUpdateComplaint } = useUpdateComplaint(onSuccess);
  const { mutate: postComment } = usePostComment(onSuccess);

  if (!complaintData) return null;

  const complaintVariant = stringToVariantEnum(
    variantIntToEnum(complaintData.complaintVariant) || "Other",
  );

  const handleStatusChange = () => {
    const updateModel: UpdateComplaintModel = {
      status: complaintData.status + 1,
      updatedUserId: retrieveFromStorage("userId") || "",
    };
    handleUpdateComplaint({
      id: complaintData.id,
      data: updateModel,
    });
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const commentData: CreateCommentData = {
        commentString: newComment,
        complaintId: complaintData.id,
        userId: complaintData.userId,
      };
      postComment(commentData);
      setNewComment("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmitComment();
    }
  };

  const toggleCommentSection = () => {
    setCommentSectionExpanded(!commentSectionExpanded);
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <DialogTitle
        sx={{ backgroundColor: "primary.main", color: "white", px: 3, py: 2 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            Complaint Details
          </Typography>
          <Box display="flex">
            <Chip
              icon={getVariantIcon(complaintVariant)}
              label={complaintVariant
                .toString()
                .replace(/([A-Z])/g, " $1")
                .trim()}
              color={getVariantColor(complaintVariant)}
              size="small"
              sx={{ mr: 1 }}
            />
            <Chip
              icon={getStatusIcon(complaintData.status)}
              label={getStatusLabel(complaintData.status)}
              color={getStatusColor(complaintData.status)}
              size="small"
              sx={{ mr: 1 }}
            />
            <Chip
              icon={<PriorityHighIcon />}
              label={priorityIntToEnum(complaintData.priority).toUpperCase()}
              color={getPriorityColor(complaintData.priority)}
              size="small"
            />
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h5" gutterBottom>
              {complaintData.customer}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="textSecondary">
              Created
            </Typography>
            <Typography variant="body2">
              {format(new Date(complaintData.createDate), "PPP p")}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="textSecondary">
              Last Updated
            </Typography>
            <Typography variant="body2">
              {format(new Date(complaintData.updatedDate), "PPP p")}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Description
            </Typography>
            <Paper
              elevation={0}
              sx={{ backgroundColor: "grey.50", p: 2, borderRadius: 1 }}
            >
              <Typography variant="body1">
                {complaintData.description}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box display="flex" alignItems="center">
                <CommentIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="h6">
                  Comments ({complaintData.comments.length})
                </Typography>
              </Box>
              <Button size="small" onClick={toggleCommentSection}>
                {commentSectionExpanded ? "Hide" : "Show"}
              </Button>
            </Box>

            {commentSectionExpanded && (
              <>
                <List
                  sx={{ width: "100%", bgcolor: "background.paper", mb: 2 }}
                >
                  {complaintData.comments
                    .map((comment) => (
                      <ListItem
                        key={comment.id}
                        alignItems="flex-start"
                        sx={{
                          py: 2,
                          borderBottom: "1px solid",
                          borderColor: "divider",
                          "&:last-child": { borderBottom: "none" },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            {getInitials(comment.user.name)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between">
                              <Typography variant="subtitle2">
                                {comment.user.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {format(
                                  new Date(comment.createDate),
                                  "MMM d, yyyy • h:mm a",
                                )}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography
                              sx={{ display: "inline", mt: 1 }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {comment.commentString}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))
                    .reverse()}
                </List>

                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={handleCommentChange}
                    onKeyPress={handleKeyPress}
                    multiline
                    rows={2}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            color="primary"
                            onClick={handleSubmitComment}
                            disabled={!newComment.trim()}
                          >
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
        <Box>
          <Button
            sx={{ p: "0.5em" }}
            onClick={handleStatusChange}
            variant={
              statusIntToEnum(complaintData.status) === "Fixed"
                ? "outlined"
                : "contained"
            }
            color={
              statusIntToEnum(complaintData.status) === "Fixed"
                ? "success"
                : "primary"
            }
            disabled={statusIntToEnum(complaintData.status) === "Fixed"}
          >
            {statusIntToEnum(complaintData.status) === "New"
              ? "Process Complaint"
              : statusIntToEnum(complaintData.status) === "Under process"
              ? "Mark as Completed"
              : "Completed"}
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default ComplaintDialog;
