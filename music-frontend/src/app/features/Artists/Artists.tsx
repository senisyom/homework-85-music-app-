import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchArtists } from "./artistsThunk";
import { selectArtists, selectLoad } from "./artistsSlice";
import ArtistItem from "../../../components/ArtistItem";
const Artist = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isFetching = useAppSelector(selectLoad);
  let content: React.ReactNode = (
    <h5 className="text-center my-5">There are no products here!</h5>
  );
  if (!isFetching) {
    content = artists.map((artist) => (
      <ArtistItem id={artist._id} name={artist.name} image={artist.image} />
    ));
  }
  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  return (
    <>
      <h3 className="text-center my-4">Artists</h3>
      <div className="list-group">{content}</div>
    </>
  );
};
export default Artist;
