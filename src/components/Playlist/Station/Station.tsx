import "./Station.scss";
import note from "../../../assets/note.svg";
import Star from "../../Star/Star";
import Equalizer from "../../Equalizer/Equalizer";

type StationPropsType = {
  station: any;
  isPlaying: boolean;
  handleSongClick: (currentStation: any) => void;
};

const Station = ({ station, isPlaying, handleSongClick }: StationPropsType) => {
  return (
    <div className="station" onClick={handleSongClick(station)}>
      <div className="note">{isPlaying ? <Equalizer /> : <img src={note} width={30} />}</div>
      <div className="station-content">{station.title}</div>
      <div className="star">
        <Star fill={false} />
      </div>
    </div>
  );
};

export default Station;
