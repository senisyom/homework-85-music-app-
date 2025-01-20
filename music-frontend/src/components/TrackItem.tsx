
interface Props {
  id: string;
  name: string;
  trackNumber: number;
  duration: string;
  buttonState: boolean;
}
const TrackItem: React.FC<Props> = ({
  name,
  duration,
  trackNumber,
  buttonState,
}) => {
  return (
    <div className="list-group-item d-flex align-items-center justify-content-between ">
      {trackNumber}. {name}
      <div>{duration}</div>
      <button disabled={buttonState} className="ms-3 btn btn-dark">
        play
      </button>
    </div>
  );
};
export default TrackItem;
