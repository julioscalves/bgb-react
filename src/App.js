import './Home.css';

import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {  
    Card,
    CardContent,
    Container,
    Grid,
} from "@mui/material"

import Header from './components/Header'
import Home from './Home'
import Manual from './Manual'

function App() {
    return (
        <Container maxWidth="md" sx={{ marginTop: "48px" }}>
            <Card sx={{ minWidth: 275, marginBottom: "48px" }} variant="outlined">
                <CardContent> 
                    <div className="Manual">
                        <Header />
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >

                                <BrowserRouter>
                                    <Switch>
                                        <Route path="/manual">
                                            <Manual />
                                        </Route>
                                        <Route path="/">
                                            <Home />
                                        </Route>                
                                    </Switch>
                                </BrowserRouter>       

                            </Grid>                
                    </div>
                </CardContent>
            </Card>
        </Container> 
    )
}

export default App


