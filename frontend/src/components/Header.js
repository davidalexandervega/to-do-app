import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="dashboardLink">
        <Link to="/">
          <b>dashboard</b>
        </Link>
      </div>
      <ul className="headerLinks">
        {user ? (
          <li>
            <div className="link" onClick={onLogout}>
              <b>logout</b>
            </div>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <b>login</b>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <b>register</b>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
