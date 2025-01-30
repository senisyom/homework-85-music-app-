import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { fetchArtist } from "../Artists/artistsThunk";
import { selectArtist } from "../Artists/artistsSlice";
import { selectAlbums, selectLoad } from "./albumSlice";
import { fetchAlbums } from "./albumThunk";
import AlbumsItem from "../../../components/AlbumItem";

const Albums = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const artist = useAppSelector(selectArtist);
  const isFetching = useAppSelector(selectLoad);
  const albums = useAppSelector(selectAlbums);

  useEffect(() => {
    if (id) {
      dispatch(fetchArtist(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (artist?._id) {
      dispatch(fetchAlbums(artist._id));
    }
  }, [dispatch, artist]);

  let content: React.ReactNode = (
    <h5 className="text-center my-5">No albums!</h5>
  );

  if (!isFetching) {
        content = albumArtist.map((album) => {
            if (user?.role === 'admin') {
                console.log(user?.role);
                return(
                    <AlbumsItem key={album._id} image={album.image} date={album.date} name={album.name} id={album._id} isPublished={album.isPublished}/>
                )
            }
            if (album.isPublished) {  
                              
                return(
                    <AlbumsItem key={album._id} image={album.image} date={album.date} name={album.name} id={album._id} isPublished={album.isPublished}/>
                )
            }
        });
    }

    return(
        <>
            <h3 className="text-center my-4">
                    {artist?.name} 
            </h3>
            <div className="list-group">
                {content}
            </div>
        </>
    )
}
};

export default Albums;
