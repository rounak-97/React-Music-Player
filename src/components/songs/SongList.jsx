import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useState } from "react";

function SongList({ songs, currentIndex, setCurrentIndex, setSongs }) {
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    const handleEditClick = (e, id, name) => {
        e.stopPropagation(); // prevent row click
        setEditId(id);
        setEditName(name);
        setOpen(true);
    };

    const handleSave = () => {
        const updatedSongs = songs.map((song) =>
            song.id === editId ? { ...song, name: editName } : song
        );

        setSongs(updatedSongs);
        setOpen(false);
    };

    if (songs.length === 0) {
        return (
            <Box
                sx={{
                    mt: 5,
                    textAlign: "center",
                    opacity: 0.6
                }}
            >
                <MusicNoteIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography>
                    No songs uploaded yet
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Song Name</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {songs.map((song, index) => {
                            const isActive = index === currentIndex;

                            return (
                                <TableRow
                                    key={song.id}
                                    onClick={() => setCurrentIndex(index)}
                                    sx={{
                                        cursor: "pointer",
                                        backgroundColor: isActive ? "#e8f5e9" : "inherit",
                                    }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{song.name}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            size="small"
                                            onClick={(e) =>
                                                handleEditClick(e, song.id, song.name)
                                            }
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Song Name</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default SongList;
