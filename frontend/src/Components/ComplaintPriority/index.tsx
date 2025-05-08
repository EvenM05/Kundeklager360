import { Typography } from "@mui/material";
import { PriorityEnum } from "../../Utils/Enums";

export const ComplaintPriority = (priorityValue: number) => {
  switch (priorityValue) {
    case PriorityEnum.Low: {
      return <Typography>Low</Typography>;
    }
    case PriorityEnum.Medium: {
      return <Typography>Medium</Typography>;
    }
    case PriorityEnum.High: {
      return <Typography>High</Typography>;
    }
  }
};
