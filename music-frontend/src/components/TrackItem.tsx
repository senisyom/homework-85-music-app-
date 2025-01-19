import { NavLink } from "react-router-dom";
interface Props {
  id: string;
  name: string;
  trackNumber: number;
  duration: string;
}
const TrackItem: React.FC<Props> = ({ name, id, duration, trackNumber }) => {
  return (
    <NavLink
      to={`/track/${id}`}
      className="list-group-item d-flex align-items-center justify-content-between list-group-item-action"
    >
      <div>{trackNumber}</div>
      <div>{name}</div>
      <div>{duration}</div>
    </NavLink>
  );
};
export default TrackItem;
