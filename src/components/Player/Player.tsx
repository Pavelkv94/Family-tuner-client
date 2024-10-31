import playIcon from "../../assets/play.svg";
import pauseIcon from "../../assets/pause.svg";
import nextIcon from "../../assets/next.svg";
import prevIcon from "../../assets/prev.svg";
import "./Player.scss";
import { StationType } from "../../types/radioTypes";

type PlayerPropsType = {
  isPlayingRadio: boolean;
  currentStation: StationType | null;
  togglePlayRadio: () => void;
  showPlayer: boolean;
  loading: boolean;
  goNextStation: () => void;
  goPrevStation: () => void;
  stations: StationType[];
};

const Player = ({ isPlayingRadio, currentStation, togglePlayRadio, loading, goNextStation, goPrevStation, stations }: PlayerPropsType) => {
  const isLastStation = stations.length - 1 === stations.findIndex((el) => el.id === currentStation?.id);
  const isFirstStation = stations.findIndex((el) => el.id === currentStation?.id) === 0;

  return (
    <div className="player">
      <div className="marquee">
        {currentStation && (
          <div className="marquee-content">
            <i>🎵 {currentStation.title}</i>
          </div>
        )}
      </div>
      <div className="player-actions">
        <div className="prev" onClick={isFirstStation ? () => {} : goPrevStation}>
          <img src={prevIcon} width={70} />
        </div>
        <div className="play" onClick={togglePlayRadio}>
          {isPlayingRadio && !loading && <div className="shine"></div>}
          {isPlayingRadio ? <img src={pauseIcon} width={80} /> : <img src={playIcon} width={80} />}
        </div>
        <div className="next" onClick={isLastStation ? () => {} : goNextStation}>
          <img src={nextIcon} width={70} />
        </div>
      </div>
    </div>
  );
};

export default Player;
