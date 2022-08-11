import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { loginUser, logoutUser } from "../reducers/userReducer";
import { setErrorNotification } from "../reducers/errorNotificationReducer";
import { Page, Input, Button, Footer, Navigation } from "../style";

const LoginForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    dispatch(setNotification(`${user.username} logged out`, 5));
  };

  const handleLoginClick = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    event.target.username.value = "";
    event.target.password.value = "";
    dispatch(loginUser(username, password));
  };

  if (user)
    return (
      <Page>
        {user.username} logged in
        <button onClick={handleLogoutClick}>logout</button>
      </Page>
    );
  return (
    <Page>
      <form onSubmit={handleLoginClick}>
        username: <Input name="username" />
        <br />
        password: <Input name="password" type="password" />
        <br />
        <Button type="submit">login</Button>
      </form>
    </Page>
  );
};

export default LoginForm;
