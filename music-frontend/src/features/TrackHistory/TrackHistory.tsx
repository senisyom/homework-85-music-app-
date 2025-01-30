import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTrackHistory } from "./trackHistoryThunk";
import { selectUser } from "../User/userSlice";
import { selectTrackHistory, selectTrackHistoryLoading } from "./trackHistorySlice";
import TrackHistoryItem from "./components/TrackHistoryItem";
import { ITrackHistory } from "../../types";

const TrackHistory = ()=>{  

    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector(selectTrackHistoryLoading);
    const tracks = useAppSelector(selectTrackHistory);
    
    useEffect(()=>{
        dispatch(getTrackHistory(user?.token))
    },[dispatch])
    
    let content: React.ReactNode = (
        <h5 className="text-center my-5">
          No Tracks!
        </h5>
    );
    
    if (tracks) {
        const trackReverse:ITrackHistory[] = [];
        tracks.map((track)=>{
            trackReverse.unshift(track);
        });
        
        
        if (!isFetching) {
            content = trackReverse.map((track, index) => (
                <TrackHistoryItem key={track._id} index={index} date={track.date} track={track.track}/>
            ));
        }
    }

    return(
        <>
            <h3 className="text-center mt-4">
                Track History
            </h3>
            <div className="list-group">
                {content}
            </div>
        </>
    )
}

export default TrackHistory;