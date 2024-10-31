import "./Station.scss";
import note from "../../../assets/note.svg";
import Star from "../../Star/Star";
import Equalizer from "../../Equalizer/Equalizer";
import { StationType } from "../../../types/radioTypes";
import { MouseEventHandler } from "react";
import Loader from "../../Loader/Loader";

type StationPropsType = {
  station: StationType;
  isPlayingCurrentStation: boolean;
  isPlayingRadio: boolean;
  handleSongClick: (currentStation: StationType) => MouseEventHandler<HTMLDivElement> | undefined;
  loading: boolean;
};

const Station = ({ station, isPlayingCurrentStation, isPlayingRadio, handleSongClick, loading }: StationPropsType) => {
  const stationImage =
    isPlayingCurrentStation && loading ? (
      <Loader />
    ) : isPlayingCurrentStation && isPlayingRadio ? (
      <Equalizer />
    ) : (
      <img src={station.img || note} width={station.img ? 50 : 30} />
    );

  return (
    <div className={`station ${isPlayingCurrentStation ? "active" : ""}`} onClick={handleSongClick(station)}>
      <div className="note">{stationImage}</div>
      <div className="station-content">
        <p>{station.title}</p>
        <span>{station.location}</span>
      </div>
      <div className="star">
        <Star fill={false} />
      </div>
    </div>
  );
};

export default Station;
