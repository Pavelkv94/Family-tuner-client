import "./Station.scss";
import note from "../../../assets/note.svg";
import Star from "../../Star/Star";
import Equalizer from "../../Equalizer/Equalizer";
import { StationType } from "../../../types/radioTypes";
import { MouseEventHandler } from "react";
import Loader from "../../Loader/Loader";
import { useParams } from "react-router-dom";
import { useAddToFavoritesMutation, useRemoveToFavoritesMutation } from "../../../redux/apiSlice";

type StationPropsType = {
  station: StationType;
  isPlayingCurrentStation: boolean;
  isPlayingRadio: boolean;
  handleSongClick: (currentStation: StationType) => MouseEventHandler<HTMLDivElement> | undefined;
  loading: boolean;
  favoriteStations: string[];
};

const Station = ({ station, isPlayingCurrentStation, isPlayingRadio, handleSongClick, loading, favoriteStations }: StationPropsType) => {
  const { id } = useParams();

  const [createData] = useAddToFavoritesMutation();
  const [removeData] = useRemoveToFavoritesMutation();

  const isFavorite = favoriteStations.includes(station.id);

  const stationImage =
    isPlayingCurrentStation && loading ? (
      <Loader />
    ) : isPlayingCurrentStation && isPlayingRadio ? (
      <Equalizer />
    ) : (
      <img src={station.img || note} width={station.img ? 50 : 30} />
    );

  const handleClickStar = () => {
    if (isFavorite) {
      removeData({ user_id: id, station_id: station.id });
    } else {
      createData({ user_id: id, station_id: station.id });
    }
  };

  return (
    <div className={`station ${isPlayingCurrentStation ? "active" : ""}`}>
      <div className="play-wrap" onClick={handleSongClick(station)}>
        <div className="note">{stationImage}</div>
        <div className="station-content">
          <p>{station.title}</p>
          <span>{station.location}</span>
        </div>
      </div>
      <div className="star" onClick={handleClickStar}>
        <Star fill={isFavorite} />
      </div>
    </div>
  );
};

export default Station;
