import * as React from 'react';
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import CircularProgress from '@mui/material/CircularProgress';

function IsPublic(props) {
  const { loading, loggedIn } = useContext(AuthContext);

  // check if page is loading
  if (loading)
    return <CircularProgress/>;

  // check if user is logged in
  if (!loggedIn) {
    // if the user is not loggedIn we return the children (the page we are trying to protect)
    return props.children;
  } else {
    //if the user is loggedin we redirect to the home page
    return <Navigate to="/" />;
  }
}

export default IsPublic;