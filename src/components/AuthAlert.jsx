import React from 'react'
import { Alert } from '@mui/material'

function AuthAlert(props) {
    return (
        <Alert severity="error" sx={{ mb: 2 }}>{ props.status }</Alert>
    )
}

export default AuthAlert
