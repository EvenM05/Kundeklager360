import { Box, CircularProgress, Typography } from "@mui/material";

export const ErrorPage = () => {
  return (
    <Box>
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Box>
  );
};
