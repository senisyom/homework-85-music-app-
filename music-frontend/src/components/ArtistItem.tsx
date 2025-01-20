import { NavLink } from "react-router-dom";
import { API_URL } from "../constants";
interface Props {
  id: string;
  name: string;
  image: string | null;
}
const ArtistItem: React.FC<Props> = ({ id, name, image }) => {
  let cardImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrgu4a7W_OM8LmAuN7Prk8dzWXm7PVB_FmA&s";
  if (image) {
    cardImage = `${API_URL}/images/${encodeURIComponent(image)}`; 
  }
  return (
    <NavLink
      to={`/artists/${id}`}
      className="list-group-item d-flex align-items-center justify-content-between list-group-item-action"
    >
      <div>{name}</div>
      <div
        style={{ width: "100px", height: "100px" }}
        className="bg-secondary-subtle d-flex align-items-center rounded-2"
      >
        <img
          style={{ maxWidth: "100%", height: "auto" }}
          className="rounded-2"
          src={cardImage}
          alt="#"
        />
      </div>
    </NavLink>
  );
};
export default ArtistItem;
