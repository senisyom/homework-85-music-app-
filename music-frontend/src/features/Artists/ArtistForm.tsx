import { useState } from "react";
import FileInput from "../../UI/FileInput/FileInput";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { createArtist } from "./artistsThunk";
import { ArtistMutation } from "../../types";

const ArtistForm = ()=>{

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [state, setState] = useState<ArtistMutation>({
        name: '',
        description: '',
        image: null,
    });

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();        
        console.log(state);
        
        dispatch(createArtist(state));
        navigate('/');
    };
    
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                    Add New Artist
                </h3>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" onChange={inputChangeHandler} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input name="description" className="form-control" type="text" onChange={inputChangeHandler}></input>
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

export default ArtistForm;
