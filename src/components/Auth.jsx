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

function Auth(props) {
    const rootURL = 'https://bazarbgb.pythonanywhere.com/'
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
                    botName="bgbbazar_bot" 
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



