import { useState } from "react";
import "./Playlist.scss";
import Station from "./Station/Station";
type PlaylistPropsType = {
  currentStation: any;
  radioStations: any[];
  handleSongClick: (currentStation: any) => void;
  handleSongClick: (currentStation: any) => void;
  currentTab: any;
  setCurrentTab: (currentStation: any) => void;
};

const Playlist = ({ radioStations, handleSongClick, currentStation, currentTab, setCurrentTab }: PlaylistPropsType) => {
  const tabs = ["All", "Favorites"];

  return (
    <div className="playlist">
      <div className="tabs">
        {tabs.map((tab, i) => (
          <div className={`tab ${i === currentTab ? "active" : ""}`} key={i} onClick={() => setCurrentTab(i)}>
            {tab}
          </div>
        ))}
      </div>
      <div className="list">
        {radioStations.map((station, i) => (
          <Station key={i} station={station} isPlaying={station.id === currentStation?.id} handleSongClick={handleSongClick} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
