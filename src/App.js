import './Home.css';

import React, { lazy, Suspense } from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {  
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
} from "@mui/material"

const Header = lazy(() => import('./components/Header'))
const Home = lazy(() => import('./Home'))
const Manual = lazy(() => import('./Manual'))

const loading = () => <CircularProgress color="success" />

function App() {
    return (
        <Container maxWidth="md" sx={{ marginTop: "48px" }}>
            <Card sx={{ minWidth: 275, marginBottom: "48px" }} variant="outlined">
                <CardContent> 
                    <div className="Manual">
                        <Suspense fallback={ loading() }>
                            <Header />
                        </Suspense>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >

                                <BrowserRouter>
                                    <Switch>
                                        <Route path="/manual">
                                            <Suspense fallback={ loading() }>
                                                <Manual />
                                            </Suspense>
                                        </Route>
                                        <Route path="/">
                                            <Suspense fallback={ loading() }>
                                                <Home />
                                            </Suspense>
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


