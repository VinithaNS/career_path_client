import { Alert } from "@mui/material";

const ErrorMessage = ({ message }) => {
  return <Alert severity="error">{message || "Something went wrong"}</Alert>;
};

export default ErrorMessage;
