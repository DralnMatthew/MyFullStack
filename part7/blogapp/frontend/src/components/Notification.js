import { useSelector } from "react-redux";
import { Page, Input, Button, Footer, Navigation } from "../style";

const Notification = (props) => {
  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const notification = useSelector((state) => state.notification);
  if (!notification) return null;
  return <Page style={style}>{notification}</Page>;
};

export default Notification;
