import { useState, useEffect } from "react";

import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { Send } from "@mui/icons-material";

import UserForm from "./UserForm";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";

function Form(props) {
  const [boardgames, setBoardgames] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [isStandard, setIsStandard] = useState(true);
  const [userData, setUserData] = useState({
    city: "",
    state: "",
    general_description: "",
    ending_date: "",
    boardgames: boardgames,
    auctions: auctions,
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [countChars, setCountChars] = useState(0);

  const [descriptionValidation, setDescriptionValidation] = useState("");

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    message: "",
  });

  const onOpenSubmit = () => setOpenSubmit(true);
  const onCloseSubmit = () => setOpenSubmit(false);

  const onAddItem = (item) => {
    if (isStandard) {
      setBoardgames([...boardgames, item]);
    } else {
      setAuctions([...auctions, item]);
    }
  };

  const onAdTypeChange = () => {
    setIsStandard(!isStandard);
  };

  const onChangeUserData = (data) => {
    setUserData({ ...userData, ...data });
  };

  const onSubmit = (event) => {
    setSubmitStatus({ loading: true, message: "" });
    event.preventDefault();

    const payload = {
      ...props.auth,
      ...userData,
    };

    if (isStandard) {
      delete payload.auctions;
      payload.type = "standard";
    } else {
      delete payload.boardgames;
      payload.type = "auction";
    }

    const url = props.rootURL + "submit";

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    })
      .then((status) => status.json())
      .then((json) => {
        if (json.status === "success") {
          setBoardgames([]);
          setAuctions([]);

          props.setAuth({
            sent: true,
          });

          setOpenSubmit(false);
          setSubmitStatus({ loading: false, message: "" });
        } else {
          setSubmitStatus({ loading: false, message: json.status });
        }
      });
  };

  useEffect(() => {
    const isCityFilled = userData.city !== "";
    const isStateFilled = userData.state !== "";
    const charsLimit = countChars <= 3800;
    let haveGames = false;

    if (isStandard) {
      haveGames = userData.boardgames.length > 0;
    } else {
      haveGames = userData.auctions.length > 0 && userData.ending_date !== "";
    }

    setIsSubmitDisabled(
      isCityFilled &&
        isStateFilled &&
        haveGames &&
        charsLimit &&
        descriptionValidation.length === 0
    );
  }, [
    userData.city,
    userData.state,
    userData.boardgames,
    userData.auctions,
    userData.ending_date,
    isStandard,
    countChars,
  ]);

  useEffect(() => {
    setUserData({ ...userData, boardgames: boardgames });
    const externalAuction = boardgames.filter(
      (item) => item.type === "Leilão Externo"
    );

    const urlRegex = new RegExp("[a-z0-9]{3,}.(com|br|net)", "gi");
    const whatsappRegex = new RegExp("(whats(app)*|zap)", "gi");

    const isURLPresent = urlRegex.test(userData.general_description);
    const isWhatsappPresent = whatsappRegex.test(userData.general_description);

    if (isWhatsappPresent) {
      setDescriptionValidation("Menções ao Whatsapp não são permitidas.");
    } else if (externalAuction.length > 0 && isURLPresent === false) {
      setDescriptionValidation("Por favor, informe o link do leilão.");
    } else {
      setDescriptionValidation("");
    }
  }, [boardgames, userData.general_description]);

  useEffect(() => {
    setUserData({ ...userData, auctions: auctions });
  }, [auctions]);

  useEffect(() => {
    let chars =
      userData.city.length +
      userData.state.length +
      userData.general_description.length;

    if (isStandard) {
      for (let game of boardgames) {
        chars += game.name.length + game.price.length + game.type.length;
      }
    } else {
      for (let game of auctions) {
        chars +=
          game.name.length + game.starting_price.length + game.increment.length;
      }
    }

    setCountChars(chars);
  }, [userData, boardgames, auctions]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {/*
      <ToggleButtonGroup
        value={isStandard}
        exclusive
        onChange={onAdTypeChange}
        aria-label="ad type"
        sx={{ mt: 3, mb: 1 }}
      >
        <ToggleButton value={true} aria-label="standard" disabled={true}>
          Anúncio
        </ToggleButton>
        <ToggleButton value={false} aria-label="auction" disabled={true}>
          Leilão
        </ToggleButton>
      </ToggleButtonGroup>
      */}

      <UserForm
        isStandard={isStandard}
        onChangeUserData={onChangeUserData}
        descriptionValidation={descriptionValidation}
        generalDescription={userData.general_description}
      />

      <Divider style={{ width: "85%", marginBottom: "24px" }} />

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <ItemForm
          isStandard={isStandard}
          onAddItem={onAddItem}
          boardgames={boardgames}
          auctions={auctions}
        />
      </Grid>

      <Divider style={{ width: "85%", marginTop: "16px" }} />

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <ItemList
          username={props.auth.username}
          isStandard={isStandard}
          userData={userData}
          boardgames={boardgames}
          auctions={auctions}
          setBoardgames={setBoardgames}
          setAuctions={setAuctions}
        />
      </Grid>

      <Divider style={{ width: "85%", mb: 3 }} />

      <Typography
        variant="body1"
        sx={{
          mt: 2,
          mb: 2,
          ml: 2,
          fontSize: "14px",
          color: "rgba(255, 255, 255, 0.7)",
        }}
        component="div"
      >
        {countChars}/3800 caracteres
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{ width: "85%", mb: 3 }}
        size="large"
        startIcon={<Send />}
        disabled={!isSubmitDisabled}
        onClick={onOpenSubmit}
      >
        Enviar
      </Button>

      <Dialog
        open={openSubmit}
        onClose={onCloseSubmit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Enviar o anúncio?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar o envio, sua conta ficará impedida de enviar novas
            mensagens por 5 dias, além de não ser possível editar o anúncio uma
            vez enviado.
          </DialogContentText>
          <DialogContentText>
            Só envie seu anúncio quando tiver certeza que está tudo certo!
          </DialogContentText>
          {submitStatus.loading ? (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <CircularProgress color="success" />
            </Grid>
          ) : (
            <></>
          )}
          {submitStatus.message.length > 0 ? (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Alert severity="error" sx={{ mt: 3 }}>
                {submitStatus.message}
              </Alert>
            </Grid>
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseSubmit}>Cancelar</Button>
          <Button
            onClick={(event) => onSubmit(event)}
            disabled={submitStatus.loading}
            autoFocus
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Form;
