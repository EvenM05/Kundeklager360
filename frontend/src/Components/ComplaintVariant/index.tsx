import { Typography } from "@mui/material";
import { ComplaintVariant } from "../../Utils/Enums";

export const ComplaintVarianta = (variantValue: number) => {
  switch (variantValue) {
    case ComplaintVariant.Product: {
      return <Typography>Product</Typography>;
    }
    case ComplaintVariant.CustomerService: {
      return <Typography>CustomerService</Typography>;
    }
    case ComplaintVariant.Delivery: {
      return <Typography>Delivery</Typography>;
    }
    case ComplaintVariant.Other: {
      return <Typography>Other</Typography>;
    }
  }
};
