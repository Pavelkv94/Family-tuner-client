import playIcon from "../../assets/play.svg";
import pauseIcon from "../../assets/pause.svg";
import nextIcon from "../../assets/next.svg";
import prevIcon from "../../assets/prev.svg";
import "./Player.scss";

type PlayerPropsType = {
  isPlayingRadio: boolean;
};
const Player = ({ isPlayingRadio }: PlayerPropsType) => {
  return (
    <div className="player">
      <div className="player-actions">
        <div className="prev">
          <img src={prevIcon} width={70} />
        </div>
        <div className="play">{isPlayingRadio ? <img src={pauseIcon} width={80} /> : <img src={playIcon} width={80} />}</div>

        <div className="next">
          <img src={nextIcon} width={70} />
        </div>
      </div>
    </div>
  );
};

export default Player;
