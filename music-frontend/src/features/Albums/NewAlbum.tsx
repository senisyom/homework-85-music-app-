import { useEffect, useState } from "react";
import FileInput from "../../UI/FileInput/FileInput";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AlbumMutation } from "../../types";
import { fetchArtists } from "../Artists/artistsThunk";
import { selectArtists, selectLoadArtist } from "../Artists/artistsSlice";
import { createAlbum } from "./albumsThunk";
import { CircularProgress } from "@mui/material";


const NewAlbum = ()=>{
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const loadinArtist = useAppSelector(selectLoadArtist)
    
    useEffect(()=>{
        dispatch(fetchArtists());
    },[dispatch]);

    const [state, setState] = useState<AlbumMutation>({
        name: '',
        artist: '',
        image: null,
    });

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();        
        console.log(state);
        
        dispatch(createAlbum(state));
        navigate('/');
    };
    
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : null;
    
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    return(
        <>
              <form onSubmit={submitFormHandler}>
                <h3 className="text-center my-4">
                    Add New Album
                </h3>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" onChange={inputChangeHandler} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    {loadinArtist ? (
                        <CircularProgress />
                        ) : (
                            <select name="artist" onChange={inputChangeHandler} value={state.artist} required className="form-select">
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
                    <FileInput label="Image" name="image" onChange={fileInputChangeHandler} ></FileInput>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-dark">Save</button>
                </div>
            </form>
        </>
    )
}

export default NewAlbum;