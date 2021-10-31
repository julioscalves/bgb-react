import React from 'react'

import {
    Alert,
    Grid,
    Typography
} from '@mui/material'

import logo from '../bgb-transparent.webp'

function Header() {
    return (
        <Grid sx={{ mb: 3 }}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <a href="/"><img src={logo} alt="BGB logo" loading="lazy" style={{ width: 15 + "em" }} /></a>
            </Grid>

            <Typography sx={{ fontSize: 24, marginBottom: 0, }} color="text.primary" align="center" gutterBottom>
                <strong>Gerador de Anúncios do </strong>
            </Typography>
            <Typography sx={{ fontSize: 24, marginBottom: 0, }} color="text.primary" align="center" gutterBottom>
                <strong><a href="https://t.me/bazarbgb">BGB • Bazar</a></strong>
            </Typography>
            
            <div className="alerts">
                <Alert variant="filled" severity="error" style={{ marginTop: 8 + "px" }}><strong>Atenção!</strong> Esta ferramenta está em desenvolvimento.</Alert>
                <Alert id="header-alert-info" variant="filled" severity="info" style={{ marginTop: 8 + "px" }}><strong>Dúvidas?</strong> Consulte nosso <a href="/manual" target="_blank"><strong>Manual!</strong></a></Alert>
            </div>            
        </Grid>
    )
}

export default Header
