import { useEffect, useRef } from "react";
import Blogs from "./components/Blog";
import blogService from "./services/blogs";

import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { setUsers } from "./reducers/usersReducer";
import Togglable from "./components/Togglable";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useMatch,
} from "react-router-dom";
import Blog from "./components/Blog";
import Users from "./components/Users";
import Auser from "./components/Auser";
import Ablog from "./components/Ablog";
import { Page, Input, Button, Footer, Navigation } from "./style";

const App = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const padding = {
    paddingRight: 5,
  };

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(setUsers());
  }, [dispatch, user, blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const match = useMatch("/users/:id");
  // console.log(match.params.id);

  const theUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const theBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  return (
    <Page>
      <Notification />
      <ErrorNotification />
      <Navigation>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <LoginForm />
      </Navigation>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <Routes>
        <Route path="/blogs/:id" element={<Ablog theBlog={theBlog} />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<Auser theUser={theUser} />} />
      </Routes>
    </Page>
  );
};

export default App;
