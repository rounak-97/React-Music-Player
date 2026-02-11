import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRef } from "react";

function UploadArea({ songs, setSongs }) {
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const newSongs = [];

    for (let file of files) {
      if (!file.type.startsWith("audio/")) {
        alert("Only audio files are allowed.");
        continue;
      }

      const songObject = {
        id: Date.now() + Math.random(),
        name: file.name,
        file: file,
        url: URL.createObjectURL(file),
      };

      newSongs.push(songObject);
    }

    if (newSongs.length > 0) {
      setSongs([...songs, ...newSongs]);
    }
  };

  const handleFileChange = (event) => {
    handleFiles(event.target.files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        border: "2px dashed #ccc",
        padding: 4,
        textAlign: "center",
        borderRadius: 2,
        backgroundColor: "#fafafa",
      }}
    >
      <CloudUploadIcon sx={{ fontSize: 40, mb: 2 }} />

      <Typography variant="h6" sx={{ mb: 2 }}>
        Drag and drop audio files here
      </Typography>

      <Button
        variant="contained"
        component="label"
      >
        Select Files
        <input
          type="file"
          hidden
          multiple
          accept="audio/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  );
}

export default UploadArea;