import React, { useState, useEffect, useMemo } from "react"

import {
    Autocomplete,
    Button,
    createFilterOptions,
    FormControl,
    Grid,
    MenuItem,
    TextField,
    Typography,
    Select,
} from "@mui/material"

import {
    ControlPoint
} from "@mui/icons-material"

import throttle from 'lodash/throttle';

const itemTypeOptions = [
    'Apenas Venda',
    'Apenas Troca',
    'Venda ou Troca',
    'Leilão Externo',
    'Procura',
]

const graphqlName = (name) => {
  const specialChars = [
    '-', ':', ';', '\\.', ',', ' '
  ]
  name = name.toLowerCase()

  for (let char in specialChars) {
    let regex = new RegExp(`${specialChars[char]}`, 'g')
    name = name.replace(regex, '%')
  }

  return `%${name}%`
}

const comparaJogosQuery = (name) => {
    return `{
        product(where: {
            name: {
                _ilike : "${name}"
            }
            type: { _neq: "rpg" }
        }) { name }
    }`
}

const generateId = () => Math.floor(Math.random() * 10000) + 1

const generateUniqueItemId = (boardgameObject) => {
    let filtered
    let id

    if (boardgameObject.length > 0) {
        do {
            id = generateId()
            filtered = boardgameObject.filter(item => item.id === id)
        
        } while (filtered.length > 0)

    } else {
        id = generateId()
    }

    return id
}

function ItemForm(props) {
    const MAXCHARS = 140

    const inputProps = {
        inputMode: 'numeric', 
        pattern: '[0-9],*',
        min: 0.01,
        max: 10000
    }

    const [boardgame, setBoardgame] = useState('')
    const [boardgameOptions, setBoardgameOptions] = useState([])
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [startingPrice, setStartingPrice] = useState('')
    const [increment, setIncrement] = useState('')
    const [typeSelect, setTypeSelect] = useState('Apenas Venda')
    const [itemSubmitDisabled, setItemSubmitDisabled] = useState(true)

    const [boardgameError, setBoardgameError] = useState('')

    const filterOptions = createFilterOptions({
        limit: 25
    })

    const formatPrice = value => parseFloat(value.replace(',', '.'))
                                                    .toLocaleString('pt-br', {
                                                        maximumFractionDigits: 2, 
                                                        minimumFractionDigits: 2
                                                    })

    const comparaJogosThrottleFetch = useMemo(() => throttle((name) => {
        const query = comparaJogosQuery(graphqlName(name))
        const url = 'https://api.comparajogos.com.br/v1/graphql'
        const jsonQuery = JSON.stringify({
            query: query
        })

        fetch(url, {
                method: 'POST',
                body: jsonQuery
            })
            .then(response => response.json())
            .then(
                json => {
                    let suggestions = []

                    json.data.product.map(name => {
                        suggestions.push(name.name)
                    })

                    suggestions = suggestions.sort(function (a, b) {
                        return a.length - b.length
                    })

                    setBoardgameOptions(suggestions)
                }
            )
    }, 1000), [])

    const onTypeChange = (event) => {
        setTypeSelect(event.target.value)
    }

    const onBoardgameChange = (event, value) => {
        if (value != null) {
            setBoardgame(value)
        } else {
            setBoardgame(event.target.value)
        }
    }

    const priceValidation = (value, source) => {
        switch (source) {
            case 'price':
                setPrice(value)
                break

            case 'startingPrice':
                setStartingPrice(value)
                break

            case 'increment':
                setIncrement(value)
                break
        }  
    }

    const onItemSubmit = (event) => {
        event.preventDefault()
        const doesBoardgameExists = boardgameOptions.indexOf(boardgame) >= 0

        if (props.isStandard && doesBoardgameExists) {
            const newItem = {
                id          : generateUniqueItemId(props.boardgames),
                name        : boardgame,
                description : description,
                price       : isNaN(formatPrice(price)) ? formatPrice("100.00") : formatPrice(price),
                type        : typeSelect,
            }

            props.onAddItem(newItem)

            setBoardgame('')
            setDescription('')
            setPrice('')
            setBoardgameError('')

        } else if (!props.isStandard && doesBoardgameExists) {
            const newItem = {
                id              : generateUniqueItemId(props.boardgames),
                name            : boardgame,
                description     : description,
                starting_price  : formatPrice(startingPrice),
                increment       : increment === '' ? formatPrice(5) : formatPrice(increment),
            }

            props.onAddItem(newItem)

            setBoardgame('')
            setDescription('')
            setStartingPrice('')
            setBoardgameError('')

        } else if (boardgameOptions.indexOf(boardgame) === -1) {
            setBoardgameError('Jogo não encontrado.')
        }
    }

    useEffect(() => {
        const isBoardgameFilled = boardgame !== ''
        const priceValidator = new RegExp('([a-z]|[0-9][\.|,][0-9]{3,})', 'gi')

        if (props.isStandard) {
            const doesTypeRequiresPrice = (typeSelect === 'Apenas Venda')||(typeSelect === 'Venda ou Troca')
            const isPriceFilled = price !== '' && !price.match(priceValidator)

            if (isBoardgameFilled && doesTypeRequiresPrice && isPriceFilled) {
                setItemSubmitDisabled(false)
            } else if (isBoardgameFilled && !doesTypeRequiresPrice) {
                setItemSubmitDisabled(false)
            } else {
                setItemSubmitDisabled(true)
            }
        } else {
            const isStartingPriceFilled = startingPrice !== '' && !startingPrice.match(priceValidator)
            const isIncrementOk = !increment.match(priceValidator) || parseFloat(increment)

            if (isBoardgameFilled && isStartingPriceFilled && isIncrementOk) {
                setItemSubmitDisabled(false)
            } else {
                setItemSubmitDisabled(true)
            }
        }
        
    }, [boardgame, price, typeSelect, startingPrice, increment])

    useEffect(() => {
        if (boardgame != null && boardgame.length > 0) {
            comparaJogosThrottleFetch(boardgame)
        }        

    }, [boardgame])

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
                    <strong>Item</strong>
                </Typography> 
            </Grid>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 2 }}
            >

                {
                    props.isStandard
                    ?   <FormControl 
                            variant="standard"
                            fullWidth
                            sx={{ width: 85 + "%" }}
                        >
                            <Select
                                labelId="type-option"
                                id="type-option-select"
                                value={ typeSelect }
                                onChange={ onTypeChange }
                            >
                                {
                                    itemTypeOptions.map(option => {
                                        return <MenuItem key={ option } value={ option }>{ option }</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    
                    :   <></>
                }

                <FormControl
                    variant="standard"
                    fullWidth
                    sx={{ width: 85 + "%" }}
                >
                    <Autocomplete
                        options={ boardgameOptions }
                        onChange={ onBoardgameChange }
                        filterOptions={ filterOptions }
                        value={ boardgame }
                        noOptionsText={ "Se tiver faltando algo, dê uma olhada no manual." }
                        renderInput={
                            (params) => <TextField 
                                            { ...params }
                                            variant="standard"
                                            label="Jogo"
                                            onChange={ onBoardgameChange }
                                            error={ 
                                                boardgameError.length > 0 
                                                    ?   true
                                                    :   false
                                            }
                                            helperText={ boardgameError }
                                            required
                                            fullWidth
                                            sx={{ mt: 2 }}
                                        />
                        }                        
                    ></Autocomplete>
                </FormControl>

                <FormControl
                    variant="standard"
                    fullWidth
                    sx={{ width: 85 + "%" }}
                >
                    <TextField 
                        id="item-description-formfield" 
                        label="Descrição do item" 
                        variant="standard"
                        onChange={ event => setDescription(event.target.value) } 
                        sx={{ mt: 2 }} 
                        value={ description }
                        helperText={`${description.length}/${MAXCHARS}`}
                        inputProps={{
                            maxLength: MAXCHARS
                        }}
                        multiline 
                        fullWidth 
                    />
                </FormControl>

                {
                    props.isStandard
                        ?   typeSelect === "Apenas Venda" || typeSelect === "Venda ou Troca"
                                ?   <FormControl variant="standard" sx={{ width: 85 + "%" }}>
                                        <TextField 
                                            id="item-price-form-field" 
                                            label="Preço" 
                                            variant="standard"
                                            type="number"
                                            inputProps={ inputProps }
                                            sx={{ mt: 1 }}
                                            onChange={ e => priceValidation(e.target.value, "price") } 
                                            value={ price } 
                                        />
                                    </FormControl>
                                :   <></>
                              

                        :   <Grid
                                container
                                spacing={ 1 }
                                sx={{ width: 86 + "%" }}
                            >
                                <Grid item xs={8}>
                                    <FormControl variant="standard" fullWidth>
                                        <TextField 
                                            id="starting-price-form-field" 
                                            label="Lance inicial" 
                                            variant="standard"
                                            type="number"
                                            inputProps={ inputProps }
                                            sx={{ mt: 1 }}
                                            onChange={ e => priceValidation(e.target.value, "startingPrice") } 
                                            value={ startingPrice } 
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <TextField 
                                            id="incremente-form-field" 
                                            label="Incremento" 
                                            variant="standard"
                                            type="number"
                                            inputProps={ inputProps }                                            
                                            sx={{ mt: 1 }}
                                            onChange={ e => priceValidation(e.target.value, "increment") } 
                                            value={ increment } 
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                }

                <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ width: 85 + "%", mt: 5 }} 
                    size="large"
                    onClick={ event => onItemSubmit(event) }
                    startIcon={<ControlPoint />}
                    disabled={ itemSubmitDisabled }
                >
                    Adicionar item
                </Button>
            
            </Grid>
        </>       
    )
}

export default ItemForm


