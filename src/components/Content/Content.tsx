/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useState } from "react";
import "./Content.scss";
import { StationType } from "../../types/radioTypes";
import Playlist from "../Playlist/Playlist";
import Player from "../Player/Player";
import { useParams } from "react-router-dom";
import { useGetFavoritesQuery, useGetStationsQuery } from "../../redux/apiSlice";

function Content() {
  const { id } = useParams();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTab, setCurrentTab] = useState<number>(0);
  const [currentStation, setCurrentStation] = useState<StationType | null>(null);
  const [isPlayingRadio, setIsPlayingRadio] = useState<boolean>(false);
  const [stations, setStations] = useState<StationType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);

  const { data: allstations } = useGetStationsQuery(null);
  const { data: favoriteStations } = useGetFavoritesQuery(id);

  useEffect(() => {
    if (allstations && favoriteStations) {
      setStations(currentTab === 0 ? allstations : allstations.filter((el: StationType) => favoriteStations.includes(el.id)));
    }
  }, [currentTab, allstations, favoriteStations]);

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
        favoriteStations={favoriteStations}
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
