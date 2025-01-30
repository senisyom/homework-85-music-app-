import dayjs from "dayjs";
import { useState } from "react";
import axiosApi from "../../../axiosApi";
import { ITrack } from "../../../types";

interface Props{
    date: string;
    track: string;
    index: number;
}

const TrackHistoryItem: React.FC<Props> = ({date, track})=>{

    const [trackName, setTrackName] = useState('');

    const getTrack = async()=>{
        try{
            const { data: tracks } = await axiosApi.get<ITrack>(`/tracks/${track}`);
            setTrackName(tracks.name)
        }catch(e){
            console.error(e)
        }
    }
    getTrack();

    return(
        <div className="list-group-item d-flex justify-content-between">
            <div>{dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</div>
            <div>{trackName}</div>
        </div>
    )
}

export default TrackHistoryItem;