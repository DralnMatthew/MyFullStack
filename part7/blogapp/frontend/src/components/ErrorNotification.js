import { useSelector } from "react-redux";
import { Page, Input, Button, Footer, Navigation } from "../style";

const ErrorNotification = (props) => {
  const style = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const errorNotification = useSelector((state) => state.errorNotification);
  if (!errorNotification) return null;
  return <Page style={style}>{errorNotification}</Page>;
};

export default ErrorNotification;
