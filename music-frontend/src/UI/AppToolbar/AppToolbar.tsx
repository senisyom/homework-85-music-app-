import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/User/userSlice";
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/User/userThunk';

const AppToolbar = ()=>{

    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [createButton, setCreateButton] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const createButtonOpen = Boolean(createButton);
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleCreateButtonClose = () => {
        setCreateButton(null);
      };
    const handleCreateButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        setCreateButton(event.currentTarget);
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleLogout = () => {
      dispatch(logout());
    };

    const user = useAppSelector(selectUser);

    let links = (
        <>
            <NavLink className="navbar-brand text-light ms-auto" to='/register'>Sign up</NavLink>
            <NavLink className="navbar-brand text-light" to='/login'>Sign in</NavLink>
        </>
    );

    if (user) {
        links = (
            <>
                <NavLink className="navbar-brand text-light ms-auto" to='/track-history'>Track-History</NavLink>
                <button className="navbar-brand text-light btn" onClick={handleCreateButtonClick}>Create</button>
                <Menu open={createButtonOpen} anchorEl={createButton} onClose={handleCreateButtonClose} keepMounted>
                    <MenuItem>
                    <NavLink className="navbar-brand text-dark d-block px-2 border-1 border-bottom" to='/add-new-artist'>New Artist</NavLink>
                    </MenuItem>
                    <MenuItem>
                    <NavLink className="navbar-brand text-dark d-block px-2 border-1 border-bottom" to='/add-new-album'>New Album</NavLink>
                    </MenuItem>
                    <MenuItem>
                    <NavLink className="navbar-brand text-dark d-block px-2 border-1 border-bottom" to='/add-new-track'>New Track</NavLink>
                    </MenuItem>
                </Menu>
                <button className="navbar-brand text-light btn" onClick={handleClick}>{user.username}</button>
                <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </>
        )
    }

    return(
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <NavLink className="navbar-brand text-light" to='/' >Music</NavLink>
                {links}
            </div>
        </nav>
    )
}

export default AppToolbar;