import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import UploadArea from "../components/upload/UploadArea";
import SongList from "../components/songs/SongList";
import ViewToggle from "../components/songs/ViewToggle";
import SongGrid from "../components/songs/SongGrid";
import AudioPlayer from "../components/player/AudioPlayer";


function Home() {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  // Console log to verify songs state
  // console.log("Current songs:", songs);


  return (
    <MainLayout>

      {/* Uploading */}
      <UploadArea songs={songs} setSongs={setSongs} />

      {/* Toggle view */}
      <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />

      {viewMode === "list" ? (

        // List View
        <SongList
          songs={songs}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setSongs={setSongs}
        />
      ) : (

        // Grid View
        <SongGrid
          songs={songs}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}

      {/* Audio Player */}
      <AudioPlayer
        songs={songs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />


    </MainLayout>
  );
}

export default Home;

