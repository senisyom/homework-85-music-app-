import {  useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { fetchArtist } from "../Artists/artistsThunk";
import { selectArtist } from "../Artists/artistsSlice";
import { selectAlbums, selectLoad } from "./albumsSlice";
import { fetchAlbums } from "./albumsThunk";
import AlbumsItem from "./components/AlbumsItem";
import { IAlbum } from "../../types";
import { selectUser } from "../User/userSlice";


const Albums = ()=>{

    const {id} = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const artist = useAppSelector(selectArtist);
    const artistId = artist?._id
    const isFetching = useAppSelector(selectLoad);
    const albums = useAppSelector(selectAlbums);
    const user = useAppSelector(selectUser);
    
    let albumArtist:IAlbum[] = [];
    if(albums.length > 0){
        albums.map((album)=>{
            if (album.artist === id) {
                albumArtist.push(album);
            }
        });
    }


    useEffect(()=>{
        dispatch(fetchArtist(id))
        if (artistId) {
            dispatch(fetchAlbums())
        }
    }, [dispatch, artistId]);

    let content: React.ReactNode = (
        <h5 className="text-center my-5">
          No albums!
        </h5>
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

export default Albums;