import { Typography } from "@mui/material";
import { StatusEnum } from "../../Utils/Enums";

export const ComplaintStatus = (priorityValue: number) => {
  switch (priorityValue) {
    case StatusEnum.New: {
      return <Typography>New</Typography>;
    }
    case StatusEnum.UnderProcess: {
      return <Typography>Under process</Typography>;
    }
    case StatusEnum.Fixed: {
      return <Typography>fixed</Typography>;
    }
  }
};
