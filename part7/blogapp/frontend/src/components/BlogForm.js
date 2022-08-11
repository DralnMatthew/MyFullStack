import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Page, Input, Button, Footer, Navigation } from "../style";

const NewBlog = (props) => {
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
    dispatch(createBlog(title, author, url));
    dispatch(setNotification(`you added ${title}`, 5));
  };

  return (
    <form onSubmit={addBlog}>
      title: <Input name="title" /> <br />
      author: <Input name="author" /> <br />
      url: <Input name="url" /> <br />
      <Button type="submit">add</Button>
    </form>
  );
};

export default NewBlog;
