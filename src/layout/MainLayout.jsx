import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

function MainLayout({ children }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <LibraryMusicIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Music Player
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 4 , pb: 12 }}>
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </>
  );
}

export default MainLayout;