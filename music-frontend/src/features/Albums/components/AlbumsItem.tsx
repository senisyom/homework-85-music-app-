import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants";
import dayjs from 'dayjs'
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectLoad } from "../albumsSlice";
import { selectUser } from "../../User/userSlice";
import { deleteAlbum, publishAlbum } from "../albumsThunk";


interface Props{
    id: string;
    name: string;
    date: Date;
    image: string | null;
    isPublished: boolean;
}

const AlbumsItem:React.FC<Props> = ({id, name, image, date, isPublished})=>{
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let cardImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrgu4a7W_OM8LmAuN7Prk8dzWXm7PVB_FmA&s';
    const isLoading = useAppSelector(selectLoad);

    if (image) {
        cardImage = `${API_URL}/images/${image}`;
    }

    const onPublish = ()=>{
        dispatch(publishAlbum(id));
        navigate('/');
    }

    const onDelete = ()=>{
        dispatch(deleteAlbum(id));
        navigate('/');
    }
    return(
        <>
            {isLoading? (
                <CircularProgress/>
            ):(
                <div className="d-flex align-items-center">
                    <NavLink to={`/albums/${id}`} className="list-group-item d-flex align-items-center justify-content-between list-group-item-action">
                        <div>
                            {dayjs(date).format('DD.MM.YYYY HH:mm:ss')}
                        </div>
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

export default AlbumsItem;