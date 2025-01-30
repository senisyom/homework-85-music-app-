import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../User/userSlice";
import { deleteArtist, publishArtist } from "../artistsThunk";
import { selectLoadArtist } from "../artistsSlice";
import { CircularProgress } from "@mui/material";

interface Props{
    id: string;
    name: string;
    image: string | null;
    isPublished: boolean;
}

const ArtistItem:React.FC<Props> = ({id, name, image, isPublished})=>{

    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectLoadArtist);
    let cardImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrgu4a7W_OM8LmAuN7Prk8dzWXm7PVB_FmA&s';

    if (image) {
        cardImage = `${API_URL}/images/${image}`;
    }

    const onPublish = ()=>{
        dispatch(publishArtist(id));
        navigate('/');
    }

    const onDelete = ()=>{
        dispatch(deleteArtist(id));
        navigate('/');
    }
    return(
        <>
        {isLoading? (
            <CircularProgress/>
        ):(
            <div className="d-flex align-items-center">
            <NavLink to={`/artists/${id}`} className="list-group-item d-flex align-items-center justify-content-between list-group-item-action">
                <div>
                    {name}
                </div>
                <div style={{width: '100px', height: '100px'}} className="bg-secondary-subtle d-flex align-items-center rounded-2">
                    <img style={{maxWidth: '100%', height: 'auto'}} className="rounded-2" src={cardImage} alt="#"/>
                </div>
            </NavLink> 
                {user?.role === 'admin' && (
                    <div style={{width: '150px'}} className="d-flex flex-column align-items-center gap-3">
                        {isPublished? (
                            <>
                                <span className="d-flex ">
                                    Published
                                </span>
                                <button onClick={onDelete} className="btn btn-danger">
                                    Delete
                                </button>
                            </>
                        ): (
                            <>
                                <span className="d-flex ">
                                    Unpublished
                                </span>
                                <button onClick={onPublish}  className="btn btn-primary">
                                    Publish
                                </button>
                            </>
                        )}
                    </div>
                )}
        </div>
        )}
        </>
    )
}

export default ArtistItem;