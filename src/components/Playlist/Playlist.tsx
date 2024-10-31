import "./Playlist.scss";
import Station from "./Station/Station";
import { StationType } from "../../types/radioTypes";
import { MouseEventHandler } from "react";
type PlaylistPropsType = {
  currentStation: StationType | null;
  radioStations: StationType[];
  handleSongClick: (currentStation: StationType) => MouseEventHandler<HTMLDivElement> | undefined;
  currentTab: number;
  setCurrentTab: (tab: number) => void;
  isPlayingRadio: boolean;
  loading: boolean;
  showPlayer: boolean;
  favoriteStations: string[];
};

const Playlist = ({
  radioStations,
  handleSongClick,
  currentStation,
  currentTab,
  setCurrentTab,
  isPlayingRadio,
  loading,
  showPlayer,
  favoriteStations,
}: PlaylistPropsType) => {
  const tabs = ["All", "Favorites"];

  return (
    <div className={`playlist ${showPlayer ? "short" : ""}`}>
      <div className="tabs">
        {tabs.map((tab, i) => (
          <div className={`tab ${i === currentTab ? "active" : ""}`} key={i} onClick={() => setCurrentTab(i)}>
            {tab}
          </div>
        ))}
      </div>
      <div className="list">
        {radioStations?.map((station, i) => (
          <Station
            loading={loading}
            key={i}
            station={station}
            isPlayingCurrentStation={station.id === currentStation?.id}
            isPlayingRadio={isPlayingRadio}
            handleSongClick={handleSongClick}
            favoriteStations={favoriteStations}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
