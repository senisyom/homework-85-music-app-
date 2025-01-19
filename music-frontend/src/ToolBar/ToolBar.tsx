import { NavLink } from "react-router-dom";

const AppToolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <NavLink className="navbar-brand text-light" to="/">
          Music
        </NavLink>
        <NavLink className="navbar-brand text-light" to="/form">
          Add
        </NavLink>
      </div>
    </nav>
  );
};
export default AppToolbar;
