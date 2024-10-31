/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useState } from "react";
import "./Content.scss";
import { StationType } from "../../types/radioTypes";
import { favoriteStations, radioStations } from "../../data";
import Playlist from "../Playlist/Playlist";
import Player from "../Player/Player";

function Content() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTab, setCurrentTab] = useState<number>(0);
  const [currentStation, setCurrentStation] = useState<StationType | null>(null);
  const [isPlayingRadio, setIsPlayingRadio] = useState<boolean>(false);
  const [stations, setStations] = useState<StationType[]>(radioStations);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const [showPlayer, setShowPlayer] = useState<boolean>(false); // Add loading state

  useEffect(() => {
    const ids = favoriteStations.map((el) => el.id);
    setStations(currentTab === 0 ? radioStations : radioStations.filter((el) => ids.includes(el.id)));
  }, [currentTab]);

  const togglePlayRadio = () => {
    if (currentStation) {
      setLoading(true);
      if (isPlayingRadio) {
        audioRef.current?.pause();
        setLoading(false);
      } else {
        audioRef.current
          ?.play()
          .then(() => {
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }
      setIsPlayingRadio(!isPlayingRadio);
    }
  };

  const handleSongClick = (station: StationType) => () => {
    setCurrentStation(station);
    togglePlayRadio();
    console.log("PLAYYYY");
  };

  useEffect(() => {
    if (currentStation && !isPlayingRadio) {
      togglePlayRadio();
    }

    if (currentStation) {
      setShowPlayer(true);
    }
  }, [currentStation]);

  const goNextStation = () => {
    const currentIndex = stations.findIndex((el) => el.id === currentStation?.id);
    setCurrentStation(stations[currentIndex + 1]);
  };

  const goPrevStation = () => {
    const currentIndex = stations.findIndex((el) => el.id === currentStation?.id);
    setCurrentStation(stations[currentIndex - 1]);
  };

  return (
    <div className="Content">
      <div className="light x1"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x9"></div>
      <Playlist
        currentStation={currentStation}
        handleSongClick={handleSongClick}
        radioStations={stations}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isPlayingRadio={isPlayingRadio}
        loading={loading}
        showPlayer={showPlayer}
      />
      <Player
        isPlayingRadio={isPlayingRadio}
        currentStation={currentStation}
        togglePlayRadio={togglePlayRadio}
        showPlayer={showPlayer}
        loading={loading}
        goNextStation={goNextStation}
        goPrevStation={goPrevStation}
        stations={stations}
      />
      {/* @ts-ignore */}
      {currentStation && <audio ref={audioRef} src={currentStation.url} controls style={{ display: "none" }} />}
    </div>
  );
}

export default Content;
