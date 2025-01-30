import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchArtists } from "./artistsThunk";
import { selectArtists, selectLoadArtist } from "./artistsSlice";
import ArtistItem from "./components/ArtistItem";
import { selectUser } from "../User/userSlice";
import { CircularProgress } from "@mui/material";

const Artists = ()=>{
    
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const isFetching = useAppSelector(selectLoadArtist);
    const user = useAppSelector(selectUser);

    let content: React.ReactNode = (
        <h5 className="text-center my-5">
            Artist list is empty
        </h5>
    );

    if (artists.length > 0) {
        content = artists.map((artist) => {
            if (user?.role === 'admin') {
                return(
                    <ArtistItem
                      key={artist._id}
                      id={artist._id}
                      name={artist.name}
                      image={artist.image}
                      isPublished={artist.isPublished}
                    />
                )
            }
            if (artist.isPublished) {                
                return(
                    <ArtistItem
                      key={artist._id}
                      id={artist._id}
                      name={artist.name}
                      image={artist.image}
                      isPublished={artist.isPublished}
                    />
                )
            }
        });
    }

    useEffect(()=>{
        dispatch(fetchArtists());
    },[dispatch])
    return(
        <>
        <h3 className="text-center my-4">
            Artists 
        </h3>
        <div className="list-group">
            {isFetching? (
                <CircularProgress/>
            ):(
                <>
                    {content}
                </>
            )}
        </div>
        </>
    )
}

export default Artists;