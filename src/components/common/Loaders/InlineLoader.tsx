// src/components/ui/InlineLoader.tsx
import { Box, CircularProgress } from "@mui/material";

export const InlineLoader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    py={4}
  >
    <CircularProgress />
  </Box>
);
