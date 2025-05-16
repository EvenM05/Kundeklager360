import FiberNewIcon from "@mui/icons-material/FiberNew";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HelpIcon from "@mui/icons-material/Help";
import { Typography } from "@mui/material";

export const getStatusIcon = (status: number) => {
  switch (status) {
    case 1:
      return <FiberNewIcon />;
    case 2:
      return <HourglassEmptyIcon />;
    case 3:
      return <CheckCircleIcon />;
  }
};

export const getStatusColor = (
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

export const getStatusLabel = (priorityValue: number) => {
  switch (priorityValue) {
    case 1: {
      return "New";
    }
    case 2: {
      return "Under process";
    }
    case 3: {
      return "Fixed";
    }
  }
};

export const getPriorityColor = (
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

export const getPriorityLabel = (priorityValue: number) => {
  switch (priorityValue) {
    case 1: {
      return "Low";
    }
    case 2: {
      return "Medium";
    }
    case 3: {
      return "High";
    }
  }
};

export const getVariantIcon = (variant: number) => {
  switch (variant) {
    case 1:
      return <CategoryIcon />;
    case 2:
      return <SupportAgentIcon />;
    case 3:
      return <LocalShippingIcon />;
    case 4:
      return <HelpIcon />;
    default:
      return <CategoryIcon />;
  }
};

export const getVariantColor = (
  variant: number,
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  switch (variant) {
    case 1:
      return "primary";
    case 2:
      return "secondary";
    case 3:
      return "info";
    case 4:
      return "info";
    default:
      return "default";
  }
};

export const getVariantLabel = (variantValue: number) => {
  switch (variantValue) {
    case 1: {
      return "Product";
    }
    case 2: {
      return "Customer service";
    }
    case 3: {
      return "Delivery";
    }
    case 4: {
      return "Other";
    }
  }
};
