import { useState } from "react";

import { CircularProgress, Grid } from "@mui/material";

import TelegramLoginButton from "react-telegram-login";
import AuthAlert from "./AuthAlert";

function Auth(props) {
  const [loading, setLoading] = useState(false);

  const handleTelegramResponse = (response) => {
    setLoading(true);

    const authObject = response;
    const authUrl = props.rootURL + "auth";

    fetch(authUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(authObject),
    }).then((response) => {
      response.json().then((json) => {
        props.setAuth(json);
        setLoading(false);
      });
    });
  };

  if (props.auth.status != "success") {
    return (
      <>
        <TelegramLoginButton
          dataOnauth={handleTelegramResponse}
          botName="bgbbazar_bot"
          requestAccess="write"
        />

        {loading ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <CircularProgress color="success" />
          </Grid>
        ) : (
          <></>
        )}

        {props.auth.status != null && props.auth.status !== "success" ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <AuthAlert status={props.auth.status} />
          </Grid>
        ) : (
          <></>
        )}
      </>
    );
  }

  return (
    <>
      <button id="login-badge">Olá, @{props.auth.username}!</button>
    </>
  );
}

export default Auth;
