import React, { useState } from "react"

import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField,
    Typography
} from "@mui/material"

import {
    Build,
    Person
} from '@mui/icons-material'

import { FixedSizeList } from 'react-window';

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
    const [targetUser, setTargetUser] = useState('')
    const [permissionsBoxOpen, setPermissionsBoxOpen] = useState(false)
    const [loadingPermissions, setLoadingPermissions] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')

    const [openListDialog, setOpenListDialog] = useState(false)
    const [listType, setListType] = useState('')
    const [listContent, setListContent] = useState([])

    const onPermissionsFetch = (url, payload) => {
        setLoadingPermissions(true)
        
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(json => {
            if (json.status !== 'success') {
                setStatusMessage(json.status)
            } else {
                setStatusMessage('success')
            }

            setLoadingPermissions(false)
        })
    }

    const onListFetch = (url, payload) => {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(json => setListContent(json))
    }

    const listOpen = (type) => {
        setListType(type)
        let url
        const payload = {
            ...props.auth
        }

        if (listType === 'usuários') {
            url = rootURL + 'users'
        } else {
            url = rootURL + 'ads'
        }

        onListFetch(url, payload)      
        setOpenListDialog(true)
    }
    const listClose = () => setOpenListDialog(false)

    const openPermissions = () => setPermissionsBoxOpen(true)
    const closePermissions = () => setPermissionsBoxOpen(false)

    const onPermissionsClick = (event) => {
        const payload = {
                ...props.auth,
                target_user: targetUser
            }

        let url

        switch (event.target.textContent) {
            case 'Resetar':
                url = rootURL + 'reset'
                break

            case 'Desbanir':
                url = rootURL + 'unban'
                break

            case 'Banir':
                url = rootURL + 'ban'
                break
        }

        onPermissionsFetch(url, payload)
    }

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
        <button id={ props.auth.is_admin ? "admin-login-badge" : "login-badge" }>Olá, @{props.auth.username}!</button>
        {
            props.auth.is_admin &&
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="outlined" color="error" startIcon={<Build />} fullWidth sx={{ width: "85%" }} onClick={ openPermissions }>Alterar permissões de usuário</Button>
                {/* <Button disabled variant="outlined" color="error" startIcon={<Person />} fullWidth sx={{ width: "85%", mt: 2 }} onClick={ () => listOpen('usuários')  }>Lista de usuários</Button> */}
            </Grid>
        }

            <Dialog open={ permissionsBoxOpen } onClose={ closePermissions }>
                <DialogTitle>Alterar permissões de um usuário?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para alterar as permissões um usuário, informe o ID ou o nome de usuário deste, sem o @,
                        e pressione o botão correspondente.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="identifier"
                        label="ID ou nome de usuário"
                        type="email"
                        onChange={ event => setTargetUser(event.target.value) }
                        fullWidth
                        variant="standard"
                    />

                    {
                        loadingPermissions &&
                            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mt: 2 }}><CircularProgress color="success" /></Grid>
                    }

                    {
                        statusMessage.length > 0 
                            ?   statusMessage === 'success'
                                ?   <Grid container direction="row" justifyContent="center" alignItems="center">
                                        <Alert severity="success" sx={{ mb: 1, mt: 1 }}>Tudo certo!</Alert>
                                    </Grid>
                                :   <Grid container direction="row" justifyContent="center" alignItems="center">
                                        <Alert severity="error" sx={{ mb: 1, mt: 1 }}>{ statusMessage }</Alert>
                                    </Grid>
                            :   <></>
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={ closePermissions }>Cancelar</Button>
                    <Button onClick={ event => onPermissionsClick(event) } color="warning" disabled={ targetUser.length === 0 }>Resetar</Button>
                    <Button onClick={ event => onPermissionsClick(event) } color="warning" disabled={ targetUser.length === 0 }>Desbanir</Button>
                    <Button onClick={ event => onPermissionsClick(event) } color="error" disabled={ targetUser.length === 0 }>Banir</Button>
                </DialogActions>
            </Dialog>  

            <Dialog 
                open={ openListDialog } 
                onClose={ listClose }
                scroll={ 'paper' }
            >
                <DialogTitle>Lista de { listType }</DialogTitle>
                <DialogContent>
                    <FixedSizeList
                        height={400}
                        width={320}
                        itemSize={124}
                        itemCount={ 
                            listContent.users != null
                            ?   listContent.users.length
                            :   0
                        }
                        overscanCount={5}
                    >
                        { renderRow }
                    </FixedSizeList>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ listClose }>Fechar</Button>
                </DialogActions>
            </Dialog>

        </>
    )

}

export default Auth



