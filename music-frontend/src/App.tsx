import { Route, Routes } from "react-router-dom";
import AppToolbar from "./ToolBar/ToolBar";
import Artist from "./app/features/Artists/Artists";
import Artists from "./app/features/Artists/Artists";
import Albums from "./app/features/Albums/Albums";
import Tracks from "./app/features/Tracks/Track";
import Register from "./app/features/User/Register";
import Login from "./app/features/User/Login";
import TrackHistory from "./app/features/TrackHistory/TrackHistory";
import "bootstrap/dist/css/bootstrap.min.css";



const App = () => {
  return (
    <div>
      <header className="bg-dark">
        <AppToolbar />
      </header>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Artist />
                <Artists />
              </>
            }
          />
          <Route
            path="/artists/:id"
            element={
              <>
                <Albums />
              </>
            }
          />
          <Route
            path="/albums/:id"
            element={
              <>
                <Tracks />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/track-history" element={<TrackHistory />} />
          <Route
            path="*"
            element={<h1 className="text-center">Not found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
