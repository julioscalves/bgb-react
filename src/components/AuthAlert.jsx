import { Alert } from "@mui/material";

function AuthAlert(props) {
  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {props.status}
    </Alert>
  );
}

export default AuthAlert;
