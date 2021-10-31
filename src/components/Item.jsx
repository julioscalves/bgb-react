import React from 'react'

import {
    IconButton,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material"

import {
    Create,
    Delete
} from "@mui/icons-material"

function Item(props) {

    if (props.isStandard) {
        return (
            <>
                <ListItem
                >
                    <ListItemText
                        key={ props.game.id }
                        primary={ props.game.type }
                        primaryTypographyProps={{
                            fontSize: "14px",
                        }}
                        secondary={
                            <>
                                <Typography>
                                    { props.game.name } { 
                                        props.game.price !== "" && (props.game.type === "Apenas Venda" || props.game.type === "Venda ou Troca")
                                            ?   " - R$ " + props.game.price 
                                            :   "" 
                                    }
                                </Typography>
                                <Typography>
                                    { props.game.description }
                                </Typography>
                            </>
                        }
                    />
                    <Stack
                        direction="row" 
                        spacing={ 2 }
                        justifyContent="flex-end"
                    >
                        <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={ () => props.openEditDialog(props.game.id, props.isStandard) }
                        >
                            <Create sx={{ color: "rgba(210, 110, 0, 1)" }} />
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={ () => props.openDeleteDialog(props.game.id, props.isStandard) }
                        >
                            <Delete sx={{ color: "rgba(210, 0, 0, 1)" }} />
                        </IconButton>
                    </Stack>
                </ListItem>
            </>
        )
    }

    return (
        <ListItem>
            <ListItemText
                key={ props.game.id }
                primary={ props.game.type }
                primaryTypographyProps={{
                    fontSize: "14px",
                }}
                secondary={
                    <>
                        <Typography>
                            { props.game.name } 
                            <Typography
                                sx={{
                                    fontSize: "14px", 
                                }}
                            >
                                Lance inicial: { props.game.starting_price !== "" ?  " R$ " + props.game.starting_price : "" }
                            </Typography>
                            <Typography
                                sx={{ 
                                    fontSize: "14px",
                                }}
                            >
                                Incremento: { props.game.increment !== "" ?  " R$ " + props.game.increment : "" }
                            </Typography>                            
                        </Typography>
                        <Typography>
                            { props.game.description }
                        </Typography>
                    </>
                }
            />
            <Stack
                direction="row" 
                spacing={ 2 }
                justifyContent="flex-end"
            >
                <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={ () => props.openEditDialog(props.game.id, props.isStandard) }
                >
                    <Create sx={{ color: "rgba(210, 110, 0, 1)" }} />
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={ () => props.openDeleteDialog(props.game.id, props.isStandard) }
                >
                    <Delete sx={{ color: "rgba(210, 0, 0, 1)" }} />
                </IconButton>
            </Stack>
        </ListItem>
    )

    
}

export default Item
