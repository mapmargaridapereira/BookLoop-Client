import * as React from 'react';
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import CircularProgress from '@mui/material/CircularProgress';

function IsLoggedOut(props) {
  const { loading, loggedIn } = useContext(AuthContext);

  // check if page is loading
  if (loading)
    return <CircularProgress/>;

  // check if user is logged in
  if (!loggedIn) {
    // if it's not logged in send user to login page
    return <Navigate to="/login" />;
  } else {
    // if is logged in return children that represent the page we're trying to protect with this function
    return props.children;
  }
}

export default IsLoggedOut;