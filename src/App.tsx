import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Playlist from "./components/Playlist/Playlist";
import Player from "./components/Player/Player";
import { favoriteStations, radioStations } from "./data";

function App() {
  const audioRef = useRef();
  const [currentTab, setCurrentTab] = useState<number>(0);

  const [currentStation, setCurrentStation] = useState(null);
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);

  const [stations, setStations] = useState(radioStations);

  useEffect(() => {
    const ids = favoriteStations.map((el) => el.id);
    setStations(currentTab === 0 ? radioStations : radioStations.filter((el) => ids.includes(el.id)));
  }, [currentTab]);

  const togglePlayRadio = () => {
    if (isPlayingRadio) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlayingRadio(!isPlayingRadio);
  };

  const handleSongClick = (audio) => () => {
    setCurrentStation(audio);
    togglePlayRadio();
    console.log("PLAYYYY");
  };

  useEffect(() => {
    if (currentStation && !isPlayingRadio) {
      togglePlayRadio();
    }
  }, [currentStation]);

  return (
    <div className="App">
      <Playlist
        currentStation={currentStation}
        handleSongClick={handleSongClick}
        radioStations={stations}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <Player isPlayingRadio={isPlayingRadio} />
      {/* @ts-ignore */}
      {currentStation && <audio ref={audioRef} src={currentStation.url} controls style={{ display: "none" }} />}
    </div>
  );
}

export default App;
