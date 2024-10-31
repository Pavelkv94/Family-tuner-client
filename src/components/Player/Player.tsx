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
};
const Player = ({ isPlayingRadio, currentStation, togglePlayRadio, loading }: PlayerPropsType) => {
  return (
    <div className="player">
      <div className="marquee">{currentStation && <div className="marquee-content">{currentStation.title}</div>}</div>
      <div className="player-actions">
        <div className="prev">
          <img src={prevIcon} width={70} />
        </div>
        <div className="play" onClick={togglePlayRadio}>
          {isPlayingRadio && !loading && <div className="shine"></div>}
          {isPlayingRadio ? <img src={pauseIcon} width={80} /> : <img src={playIcon} width={80} />}
        </div>
        <div className="next">
          <img src={nextIcon} width={70} />
        </div>
      </div>
    </div>
  );
};

export default Player;
