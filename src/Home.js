import './Home.css';

import React, { useState } from "react"

import {  
    Alert,
    AlertTitle,
    Divider,
    Grid,
} from "@mui/material"

import Auth from './components/Auth'
import Form from './components/Form'

function Home() {
    const [auth, setAuth] = useState({ })

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Auth auth={ auth } setAuth={ setAuth } />

                {
                    auth.sent &&
                    <Alert severity="success" sx={{ mt: 2 }}>
                        <AlertTitle>Tudo certo!</AlertTitle>
                        Sua mensagem foi enviada para o Bazar BGB. Caso necessário, entre em contato com a administração.
                    </Alert>
                }
            </Grid> 

            <Divider sx={{ mt: 4, mb: 1, width: "85%", mx: "auto" }} />

            {
                auth.status === "success"
                    ?   <Form auth={ auth } setAuth={ setAuth } />
                    :   <></>
            }
        </>
                
    );
}

export default Home;
