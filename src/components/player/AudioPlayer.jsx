import {
    Box,
    IconButton,
    Typography,
    Slider
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useRef, useEffect, useState, useCallback } from "react";

function AudioPlayer({
    songs,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    setIsPlaying
}) {
    const audioRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleNext = useCallback(() => {
        if (!songs.length) return;

        const nextIndex =
            currentIndex + 1 < songs.length ? currentIndex + 1 : 0;

        setCurrentIndex(nextIndex);
    }, [currentIndex, songs, setCurrentIndex]);

    const handlePrevious = useCallback(() => {
        if (!songs.length) return;

        const prevIndex =
            currentIndex - 1 >= 0 ? currentIndex - 1 : songs.length - 1;

        setCurrentIndex(prevIndex);
    }, [currentIndex, songs, setCurrentIndex]);

    const handlePlayPause = () => {
        if (currentIndex === null) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    // Load new song
    useEffect(() => {
        if (currentIndex !== null && songs[currentIndex]) {
            audioRef.current.src = songs[currentIndex].url;
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [currentIndex, songs, setIsPlaying]);

    // Track time + autoplay next
    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        };

        const setAudioData = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            handleNext();
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", setAudioData);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", setAudioData);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [handleNext]);

    const formatTime = (time) => {
        if (!time) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height: { xs: 140, sm: 100 },
                backgroundColor: "#fff",
                borderTop: "1px solid #ddd",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                px: 3,
                py: { xs: 1, sm: 0 }
            }}
        >
            <audio ref={audioRef} />

            {/* Left */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <MusicNoteIcon />
                <Typography variant="body1">
                    {currentIndex !== null ? songs[currentIndex]?.name : "No song selected"}
                </Typography>
            </Box>

            {/* Center */}
            <Box
                sx={{
                    width: { xs: "100%", sm: "40%" },
                    textAlign: "center",
                    mt: { xs: 1, sm: 0 }
                }}
            >
                <Box>
                    <IconButton
                        onClick={handlePrevious}
                        disabled={currentIndex === null}
                    >
                        <SkipPreviousIcon />
                    </IconButton>

                    <IconButton
                        onClick={handlePlayPause}
                        disabled={currentIndex === null}
                    >
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        disabled={currentIndex === null}
                    >
                        <SkipNextIcon />
                    </IconButton>
                </Box>

                <Slider
                    size="small"
                    value={currentTime}
                    max={duration || 0}
                    onChange={(e, newValue) => {
                        audioRef.current.currentTime = newValue;
                        setCurrentTime(newValue);
                    }}
                />
            </Box>

            {/* Right */}
            <Box>
                <Typography variant="body2">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </Typography>
            </Box>
        </Box>
    );
}

export default AudioPlayer;