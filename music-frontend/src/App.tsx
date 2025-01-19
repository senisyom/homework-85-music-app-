import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppToolbar from "./ToolBar/ToolBar";
import { Route, Routes } from "react-router-dom";
import Artist from "./app/features/Artists/Artists";
import Artists from "./app/features/Artists/Artists";
import Albums from "./app/features/Albums/Albums";
import Tracks from "./app/features/Tracks/Track";

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
