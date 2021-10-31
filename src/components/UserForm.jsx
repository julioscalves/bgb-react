import React, { useState, useEffect } from "react"

import {
    Alert,
    AlertTitle,
    Autocomplete,
    createFilterOptions,
    FormControl,
    Grid,
    InputLabel,
    TextField,
    Typography,
    MenuItem,
    Select,
} from "@mui/material"

import SelectDate from './SelectDate'

const states = [
    "AC", "AL", "AP", "AM", "BA",
    "CE", "DF", "ES", "GO", "MA", 
    "MT", "MS", "MG", "PA", "PB", 
    "PR", "PI", "RJ", "RN", "RS", 
    "RO", "RR", "SC", "SP", "SE", 
    "TO", "PE",
]

function UserForm(props) {
    const MAXCHARS = 600

    const [city, setCity] = useState('')
    const [cityList, setCityList] = useState([])

    const filterOptions = createFilterOptions({
        limit: 25,
        matchFrom: 'start'
    })

    const onCityChange = (event, value) => {
        if (value != null) {
            setCity(value)
        }
    }

    const onStateChange = event => {
        props.onChangeUserData({ state: event.target.value })
    }

    const onGeneralDescriptionChange = event => {
        props.onChangeUserData({ general_description: event.target.value })
    }

    useEffect(() => {
        const url = 'https://gist.githubusercontent.com/letanure/3012978/raw/2e43be5f86eef95b915c1c804ccc86dc9790a50a/estados-cidades.json'
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let cities = []
                data.estados.forEach(
                    element => cities.push(element.cidades)
                )
                cities = [...new Set(cities.flat())]

                setCityList(cities)
            })
    }, [])

    useEffect(() => {
        const cityFilter = cityList.filter(name => name === city)

        if (cityFilter.length > 0) {
            props.onChangeUserData({ city: city })
        } else {
            props.onChangeUserData({ city: '' })
        }

    }, [city])

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 5, width: 85 + "%" }}
        >
            {
                !props.isStandard
                    ?   <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                                <Alert severity="warning" sx={{ mt: 2, mb: 1 }}>
                                    <AlertTitle>Atenção!</AlertTitle>
                                    Antes de utilizar esta opção, <strong>certifique-se de ter lido o <a href="/manual" target="_blank">Manual!</a></strong>
                                </Alert>
                            </Grid>
                    :   <></>
            }
            
            <Typography variant="h6" sx={{ mt: 2, mb: 2, textAlign: "center" }} component="div">
                <strong>Informações Gerais</strong>
            </Typography>

            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={9}>
                    <FormControl variant="standard" fullWidth>
                        <Autocomplete
                            options={ cityList }
                            filterOptions={ filterOptions  }
                            noOptionsText={ "Se tiver faltando algo, dê uma olhada no manual." }                            
                            value={ city }
                            onChange={ (event, value) => onCityChange(event, value) }
                            renderInput={
                                (params) => <TextField 
                                                { ...params }
                                                variant="standard"
                                                label="Cidade"
                                                onChange={ (event, value) => onCityChange(event, value) }
                                                required
                                                fullWidth
                                            />
                            }                        
                        >
                        </Autocomplete>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="state-select-label">Estado</InputLabel>
                        <Select 
                            labelId="state-select-label" 
                            id="state-select" 
                            label="Estado" 
                            onChange={ e => onStateChange(e) }
                            required 
                            fullWidth
                        >
                            {
                                states.map(uf => {
                                    return <MenuItem key={ uf } value={ uf }>{ uf }</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>

                {
                    !props.isStandard
                        ?   <SelectDate onChangeUserData= { props.onChangeUserData } />
                        :   <></>
                }
                <Grid item xs={12}>
                    <FormControl variant="standard" fullWidth>
                        <TextField 
                            id="general-description-formfield" 
                            label="Descrição geral do anúncio" 
                            variant="standard" 
                            sx={{ mt: 1 }} 
                            onChange={ e => onGeneralDescriptionChange(e) }
                            helperText={
                                    props.descriptionValidation.length > 0
                                    ?   props.descriptionValidation
                                    :   `${props.generalDescription.length}/${MAXCHARS}`
                            }
                            inputProps={{
                                maxLength: MAXCHARS
                            }}
                            error={ props.descriptionValidation.length > 0 }
                            multiline 
                            fullWidth 
                        />
                    </FormControl>
                </Grid>
            </Grid>        
        </Grid>
    )
}

export default UserForm
