import { Box, Button } from "@mui/material";

function ViewToggle({ viewMode, setViewMode }) {
  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Button
        variant={viewMode === "list" ? "contained" : "outlined"}
        onClick={() => setViewMode("list")}
        sx={{ mr: 2 }}
      >
        List View
      </Button>

      <Button
        variant={viewMode === "grid" ? "contained" : "outlined"}
        onClick={() => setViewMode("grid")}
      >
        Grid View
      </Button>
    </Box>
  );
}

export default ViewToggle;