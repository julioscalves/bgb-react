import React, { useState } from "react"

import {
    CircularProgress,
    Grid,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material"

import TelegramLoginButton from 'react-telegram-login'
import AuthAlert from "./AuthAlert"

function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText 
            primary={
                <>
                    <Typography variant="subtitle1">
                        Placeholder {/* @{ listContent.users[index][1] } - { listContent.users[index][0] } */}
                    </Typography>               
                </>
            }
            secondary={
                <>
                    <Typography variant="subtitle2">
                        Placeholder {/*Bloqueio até { listContent.users[index][2] } */}
                    </Typography>   
                    <Typography variant="subtitle2">
                        Placeholder {/*
                        
                        { 
                            listContent.users[index][3]
                            ?   "ESTÁ banido."
                            :   "NÃO está banido."
                        }
                    */}
                    </Typography>            
                </>
            }
          />
        </ListItemButton>
      </ListItem>
    );
  }

function Auth(props) {
    const rootURL = 'https://api-bgb.herokuapp.com/'
    const [loading, setLoading] = useState(false)

    const handleTelegramResponse = response => {
        setLoading(true)

        const authObject = response
        const authUrl = rootURL + 'auth'

        fetch(
            authUrl, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authObject)
            }
        ).then(response => {
            response.json()
                .then(
                    json => {
                        props.setAuth(json)
                        setLoading(false)
                    }
                )
        })

    }

    if (props.auth.status != "success") {
        return (
            <>
                <TelegramLoginButton 
                    dataOnauth={ handleTelegramResponse }
                    botName="bgbtests_bot" 
                />

                { 
                    loading 
                        ?   <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mt: 2 }}><CircularProgress color="success" /></Grid>
                        :   <></>
                }

                {
                    (props.auth.status != null && props.auth.status !== "success")
                        ?   <Grid container direction="row" justifyContent="center" alignItems="center">
                                <AuthAlert status={props.auth.status} />
                            </Grid>
                        
                        :   <></>
                }
            </>
        )
    } 

    return (
        <>
            <button id="login-badge">Olá, @{props.auth.username}!</button>
        </>
    )

}

export default Auth



