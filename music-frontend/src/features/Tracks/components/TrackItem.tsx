import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { trackHistory } from "../../TrackHistory/trackHistoryThunk";
import { selectUser } from "../../User/userSlice";
import { deleteTrack, publishTrack } from "../trackThunk";

interface Props{
    id: string;
    name: string;
    trackNumber: number;
    duration: string;
    buttonState: boolean;
    isPublished: boolean;
}

const TrackItem:React.FC<Props> = ({name, id, duration, trackNumber, buttonState, isPublished})=>{
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const listenTrack = ()=>{
        dispatch(trackHistory({track: id}));
    }

    const onPublish = ()=>{
        dispatch(publishTrack(id));
        navigate('/');
    }

    const onDelete = ()=>{
        dispatch(deleteTrack(id));
        navigate('/');
    }

    return(
        <>
        <div className="d-flex align-items-center">
            <div className="list-group-item d-flex align-items-center justify-content-between flex-grow-1">
                <div>
                    {trackNumber}. {name} 
                </div>
                <div>
                    {duration}
                    <button disabled={buttonState} onClick={listenTrack} className="ms-3 btn btn-dark">
                        play
                    </button>
                </div>
            </div> 
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
        </>
    )
}

export default TrackItem;