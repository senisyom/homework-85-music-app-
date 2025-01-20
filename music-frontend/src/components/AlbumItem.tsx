import { NavLink } from "react-router-dom";
import { API_URL } from "../constants";
import dayjs from "dayjs";
interface Props {
  id: string;
  name: string;
  date: Date;
  image: string | null;
}
const AlbumsItem: React.FC<Props> = ({ id, name, image, date }) => {
  let cardImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrgu4a7W_OM8LmAuN7Prk8dzWXm7PVB_FmA&s";

  if (image) {
    cardImage = `${API_URL}/images/${encodeURIComponent(image)}`; 
  }
  return (
    <NavLink
      to={`/albums/${id}`}
      className="list-group-item d-flex align-items-center justify-content-between list-group-item-action"
    >
      <div>{dayjs(date).format("DD.MM.YYYY HH:mm:ss")}</div>
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
export default AlbumsItem;
