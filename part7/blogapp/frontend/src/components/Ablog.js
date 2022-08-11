import { useDispatch, useSelector } from "react-redux";
import { addLike, removeBlog, addComment } from "../reducers/blogReducer";
import { Page, Input, Button, Footer, Navigation } from "../style";

const Ablog = ({ theBlog }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(theBlog);
  const handleClick = () => dispatch(addLike(theBlog.id));
  const handleRemoveClick = () => dispatch(removeBlog(theBlog.id));
  const handleCommentClick = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    dispatch(addComment(theBlog.id, comment));
  };
  return (
    <Page>
      <li onClick={handleClick}>
        {theBlog.title} <br />
        {theBlog.author} <br />
        likes {theBlog.likes} <Button type="submit"> like </Button> <br />
        {theBlog.url} <br />
        {user && theBlog.user.username === user.username ? (
          <Button type="button" onClick={handleRemoveClick}>
            remove
          </Button>
        ) : null}
      </li>
      <h3>comments</h3>
      <form onSubmit={handleCommentClick}>
        <Input name="comment" />
        <Button type="submit">add comment</Button>
      </form>
      <ul>
        {theBlog.comments
          ? theBlog.comments.map((comment) => <li>{comment}</li>)
          : null}
      </ul>
    </Page>
  );
};

export default Ablog;
