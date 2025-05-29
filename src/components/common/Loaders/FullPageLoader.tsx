import { Box, CircularProgress } from "@mui/material";

export const FullPageLoader = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "rgba(255, 255, 255, 0.8)",
      zIndex: 1300,
    }}
  >
    <CircularProgress size={60} />
  </Box>
);
