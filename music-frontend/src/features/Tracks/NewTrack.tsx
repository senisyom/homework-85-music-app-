import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectArtists, selectLoadArtist } from "../Artists/artistsSlice";
import { selectAlbums, selectLoad } from "../Albums/albumsSlice";
import { useEffect, useState } from "react";
import { fetchArtists } from "../Artists/artistsThunk";
import { fetchAlbums } from "../Albums/albumsThunk";
import { IAlbum, TrackMutation } from "../../types";
import { CircularProgress } from "@mui/material";
import { createTrack } from "./trackThunk";

const NewTrack = ()=>{
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const loadinArtist = useAppSelector(selectLoadArtist);
    const albums = useAppSelector(selectAlbums);
    const loadinAlbums = useAppSelector(selectLoad);

    const [artist, setArtist] = useState('');
    const [albumArtist, setAlbumArtist] = useState<IAlbum[]>([]);
    
    useEffect(()=>{
        dispatch(fetchAlbums());
    },[dispatch, artist]);
    
    useEffect(()=>{
        const newAlbum:IAlbum[] = [];
        albums.map((album)=>{
            if (album.artist === artist) {
                newAlbum.push(album);
            }
        })
        setAlbumArtist(newAlbum);
    },[dispatch, artist]);
    
    useEffect(()=>{
        dispatch(fetchArtists());
    },[dispatch]);

    const [state, setState] = useState<TrackMutation>({
        name: '',
        album: '',
        duration: '',
    });

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();        
        dispatch(createTrack(state));
        navigate('/');
    };
    
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    return(
        <>
              <form onSubmit={submitFormHandler}>
                <h3 className="text-center my-4">
                    Add New Track
                </h3>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" onChange={inputChangeHandler} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Duration</label>
                    <input type="text" name="duration" className="form-control" onChange={inputChangeHandler} required/>
                </div>
                <div className="mb-3">
                    {loadinArtist ? (
                        <CircularProgress />
                        ) : (
                            <select name="artist" onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>setArtist(event.target.value)} value={artist} required className="form-select">
                                <option value="" disabled>
                                    Select Artist
                                </option>
                                {artists.map((artist)=>{
                                    return(
                                        <option key={artist._id} value={artist._id}>{artist.name}</option>
                                    )
                                })}
                            </select>
                        )}
                </div>
                <div className="mb-3">
                    {loadinAlbums ? (
                        <CircularProgress />
                        ) : (
                            <select name="album" onChange={inputChangeHandler} value={state.album} required className="form-select">
                                <option value="" disabled>
                                    Select Albums
                                </option>
                                {albumArtist.map((album)=>{
                                    return(
                                        <option key={album._id} value={album._id}>{album.name}</option>
                                    )
                                })}
                            </select>
                        )}
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-dark">Save</button>
                </div>
            </form>
        </>
    )
}

export default NewTrack;