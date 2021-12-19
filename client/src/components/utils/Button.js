import Button from "@mui/material/Button";

const contained = {
  backgroundColor: "#6096BA",
  color: "EFEFEF",
  fontSize: "1.6rem",
  boxShadow: "none",
  fontFamily: "'Montserrat Alternates', sans-serif",
  fontStyle: "normal",
  fontWeight: "bold",
  textTransform:"none",
};

const containedFalse = {
  color: "EFEFEF",
  fontSize: "1.6rem",
  backgroundColor:"#6A8EC755",
  boxShadow: "none",
  fontFamily: "'Montserrat Alternates', sans-serif",
  fontStyle: "normal",
  fontWeight: "bold",
  textTransform:"none",
};

const text = {
  color: "#274C77",
  textTransform:"none",
  fontSize: "1.2rem",
  fontFamily: "'Montserrat Alternates', sans-serif",
};

const textLogout= {
    color: "#ffffff",
    textTransform:"none",
    fontSize: "1.4rem",
    fontFamily: "'Montserrat Alternates', sans-serif",
  };

export const ButtonContained = (props) => {
  return (
    <Button variant="contained" style={props.status==='false'?containedFalse: contained}>
      {props.name}
    </Button>
  );
};

export const ButtonText = (props) => {

  return (
    <Button variant="text" style={props.name==="LOGOUT"?textLogout:text}>
      {props.name}
    </Button>
  );
};
