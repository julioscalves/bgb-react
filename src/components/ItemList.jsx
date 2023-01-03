import { useState, useEffect } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListSubheader,
  MenuItem,
  TextField,
  Typography,
  Select,
} from "@mui/material";

import Item from "./Item";

function ItemList(props) {
  const MAXCHARS = 140;
  const rootURL = "https://bazarbgb.pythonanywhere.com/";

  const inputProps = {
    inputMode: "numeric",
    pattern: "[0-9],*",
    min: 0.01,
    max: 10000,
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRecoverDialogOpen, setIsRecoverDialogOpen] = useState(false);
  const [recoverID, setRecoverID] = useState("");
  const [deleteTargetName, setDeleteTargetName] = useState("");
  const [target, setTarget] = useState("");

  const [recoverLoading, setRecoverLoading] = useState(false);
  const [recoverError, setRecoverError] = useState("");

  const [editID, setEditID] = useState("");
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStartingPrice, setEditStartingPrice] = useState("");
  const [editIncrement, setEditIncrement] = useState("");

  const [isEditSubmitDisabled, setIsEditSubmitDisabled] = useState(false);

  const openDeleteDialog = (id, isStandard) => {
    let targetFilter;

    if (isStandard) {
      targetFilter = props.boardgames.filter((game) => game.id === id);
    } else {
      targetFilter = props.auctions.filter((game) => game.id === id);
    }

    setDeleteTargetName(targetFilter[0].name);
    setIsDeleteDialogOpen(true);
    setTarget(id);
  };

  const formatPrice = (value) =>
    parseFloat(value.replace(".", "").replace(",", ".")).toLocaleString(
      "pt-br",
      {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }
    );

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const onDeleteItem = () => {
    if (props.isStandard) {
      const afterDeletion = props.boardgames.filter(
        (game) => game.id !== target
      );
      props.setBoardgames(afterDeletion);
    } else {
      const afterDeletion = props.auctions.filter((game) => game.id !== target);
      props.setAuctions(afterDeletion);
    }
    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (id, isStandard) => {
    setIsEditDialogOpen(true);
    let item;

    if (props.isStandard) {
      item = props.boardgames.filter((game) => game.id === id)[0];

      setEditID(id);

      setEditType(item.type);
      setEditPrice(item.price);
    } else {
      item = props.auctions.filter((game) => game.id === id)[0];

      setEditID(id);

      setEditStartingPrice(item.starting_price);
      setEditIncrement(item.increment);
    }

    setEditName(item.name);
    setEditDescription(item.description);
  };

  const closeEditDialog = () => setIsEditDialogOpen(false);

  const priceValidation = (value, source) => {
    switch (source) {
      case "editPrice":
        setEditPrice(value);
        break;

      case "editStartingPrice":
        setEditStartingPrice(value);
        break;

      case "editIncrement":
        setEditIncrement(value);
        break;
    }
  };

  const onEditItem = () => {
    let filtered;

    if (props.isStandard) {
      const editted = {
        id: editID,
        name: editName,
        price: formatPrice(editPrice),
        description: editDescription,
        type: editType,
      };

      filtered = props.boardgames.filter((game) => game.id !== editID);
      filtered = [...filtered, editted];
      props.setBoardgames(filtered);
    } else {
      const editted = {
        id: editID,
        name: editName,
        starting_price: formatPrice(editStartingPrice),
        increment: formatPrice(editIncrement),
        description: editDescription,
      };

      filtered = props.auctions.filter((game) => game.id !== editID);
      filtered = [...filtered, editted];
      props.setAuctions(filtered);
    }

    setIsEditDialogOpen(false);
  };

  const openRecoverDialog = () => setIsRecoverDialogOpen(true);
  const closeRecoverDialog = () => setIsRecoverDialogOpen(false);

  const onRecover = () => {
    setRecoverLoading(true);
    setRecoverError("");

    const url = rootURL + "get_ad";

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ id: recoverID }),
    })
      .then((status) => status.json())
      .then((json) => {
        if (json.status) {
          setRecoverError(json.status);
        } else {
          if (props.isStandard) {
            if (json[0].price != null) {
              props.setBoardgames(json);
              closeRecoverDialog();
            } else {
              setRecoverError(
                "Não é possível importar os itens de um leilão em um anúncio padrão."
              );
            }
          } else {
            if (json[0].starting_price != null) {
              props.setAuctions(json);
              closeRecoverDialog();
            } else {
              setRecoverError(
                "Não é possível importar os itens de um anúncio padrão em um leilão."
              );
            }
          }
        }

        setRecoverLoading(false);
      });
  };

  useEffect(() => {
    const priceValidator = new RegExp(
      "([a-z]|[0-9]{1,}([\\.]|[,][0-9]{3,})[,][0-9]{2})",
      "gi"
    );
    const editPriceCheck = editPrice.toLocaleString("pt-br", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

    if (
      props.isStandard &&
      (editType === "Apenas Venda" || editType === "Venda ou Troca")
    ) {
      const isPriceOk =
        !editPriceCheck.match(priceValidator) && editPrice !== "";

      if (isPriceOk) {
        setIsEditSubmitDisabled(false);
      } else {
        setIsEditSubmitDisabled(true);
      }
    } else if (!props.isStandard) {
      const isStartingPriceOk =
        !editPriceCheck.match(editStartingPrice) && editStartingPrice !== "";
      const isIncrementOk = !editPriceCheck.match(editIncrement);

      if (isStartingPriceOk && isIncrementOk) {
        setIsEditSubmitDisabled(false);
      } else {
        setIsEditSubmitDisabled(true);
      }
    }
  }, [props.isStandard, editPrice, editStartingPrice, editIncrement, editType]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        <Typography
          variant="h6"
          sx={{ mt: 2, mb: 1, textAlign: "center" }}
          component="div"
        >
          <strong>Lista de itens</strong>
        </Typography>
      </Grid>

      {props.isStandard ? (
        props.userData.boardgames.length === 0 ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button size="small" onClick={openRecoverDialog}>
              Importar itens
            </Button>
          </Grid>
        ) : (
          <></>
        )
      ) : props.userData.auctions.length === 0 ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button size="small" onClick={openRecoverDialog}>
            Importar itens
          </Button>
        </Grid>
      ) : (
        <></>
      )}

      <Box
        sx={{
          width: "85%",
          wordWrap: "break-word",
        }}
      >
        <List
          dense
          subheader={
            <>
              <ListSubheader>
                {props.isStandard ? "Anúncio " : "Leilão "}
                de @{props.username}
              </ListSubheader>
              {!props.isStandard ? (
                <Typography
                  sx={{
                    fontSize: "14px",
                    ml: 2,
                  }}
                >
                  Encerramento: {props.userData.ending_date}
                </Typography>
              ) : (
                <></>
              )}
            </>
          }
        >
          {props.isStandard
            ? props.userData.boardgames.map((game) => {
                return (
                  <Item
                    isStandard={props.isStandard}
                    game={game}
                    openDeleteDialog={openDeleteDialog}
                    openEditDialog={openEditDialog}
                    key={game.id}
                  />
                );
              })
            : props.userData.auctions.map((game) => {
                return (
                  <Item
                    isStandard={props.isStandard}
                    game={game}
                    openDeleteDialog={openDeleteDialog}
                    openEditDialog={openEditDialog}
                  />
                );
              })}

          <Typography
            variant="body1"
            sx={{ mt: 2, mb: 2, ml: 2, fontSize: "14px" }}
            component="div"
          >
            {props.userData.general_description}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 2, mb: 2, ml: 2, fontSize: "14px" }}
            component="div"
          >
            {props.userData.city} {props.userData.state}
          </Typography>
        </List>
      </Box>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remover este item?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Por favor, confirme a deleção do item {deleteTargetName}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancelar</Button>
          <Button onClick={onDeleteItem} autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isEditDialogOpen}
        onClose={closeEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Editar este item?</DialogTitle>
        <DialogContent>
          {props.isStandard && (
            <Select
              labelId="adtype-select-label-edit"
              id="adtype-select"
              variant="standard"
              value={editType}
              onChange={(event) => setEditType(event.target.value)}
              label="Anúncio"
              sx={{ mb: 1 }}
              fullWidth
            >
              <MenuItem value={"Apenas Venda"}>Apenas Venda</MenuItem>
              <MenuItem value={"Apenas Troca"}>Apenas Troca</MenuItem>
              <MenuItem value={"Venda ou Troca"}>Venda ou Troca</MenuItem>
              <MenuItem value={"Leilão Externo"}>Leilão Externo</MenuItem>
              <MenuItem value={"Procura"}>Procura</MenuItem>
            </Select>
          )}

          <TextField
            id="edit-game"
            label="Jogo"
            variant="standard"
            value={editName}
            fullWidth
            disabled
          />

          <TextField
            id="edit-description"
            label="Descrição"
            variant="standard"
            value={editDescription}
            onChange={(event) => setEditDescription(event.target.value)}
            helperText={`${editDescription.length}/${MAXCHARS}`}
            inputProps={{
              maxLength: MAXCHARS,
            }}
            sx={{ mt: 1 }}
            fullWidth
          />

          {props.isStandard ? (
            editType === "Apenas Venda" || editType === "Venda ou Troca" ? (
              <TextField
                id="edit-price"
                label="Preço"
                variant="standard"
                value={editPrice}
                onChange={(event) =>
                  priceValidation(event.target.value, "editPrice")
                }
                inputProps={inputProps}
                sx={{ mt: 1 }}
                fullWidth
              />
            ) : (
              <></>
            )
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <TextField
                id="edit-starting-price"
                label="Lance inicial"
                variant="standard"
                value={editStartingPrice}
                onChange={(event) =>
                  priceValidation(event.target.value, "editStartingPrice")
                }
                inputProps={inputProps}
                sx={{ mt: 1 }}
                fullWidth
              />
              <TextField
                id="edit-increment"
                label="Incremento"
                variant="standard"
                value={editIncrement}
                onChange={(event) =>
                  priceValidation(event.target.value, "editIncrement")
                }
                inputProps={inputProps}
                sx={{ mt: 1 }}
                fullWidth
              />
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancelar</Button>
          <Button
            onClick={onEditItem}
            disabled={isEditSubmitDisabled}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isRecoverDialogOpen}
        onClose={closeRecoverDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Importar itens de outro anúncio?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao informar o ID, você poderá importar os jogos referentes a um
            anúncio já enviado ao Bazar.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ID"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setRecoverID(event.target.value)}
          />
          {recoverLoading ? (
            <Grid container alignItems="center" justifyContent="center">
              <CircularProgress color="success" sx={{ mt: 2 }} />
            </Grid>
          ) : recoverError.length > 0 ? (
            <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
              {recoverError}
            </Alert>
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRecoverDialog}>Cancelar</Button>
          <Button
            onClick={onRecover}
            autoFocus
            inputProps={{
              maxLength: 9,
            }}
            disabled={!recoverID.match(/([0-9]{8}|[0-9]{4}\.[0-9]{4})/)}
          >
            Importar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ItemList;
