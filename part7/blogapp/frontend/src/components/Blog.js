import { connect } from "react-redux";
import { addLike, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";
import { Page, Input, Button, Footer, Navigation } from "../style";

const Blog = ({ blog }) => {
  // const user = useSelector((state) => state.user);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  // return (
  //   <li style={blogStyle} onClick={handleClick}>
  //     {blog.title} <br />
  //     {blog.author} <br />
  //     likes {blog.likes} <button type="submit"> like </button> <br />
  //     {blog.url} <br />
  //     {user && blog.user.username === user.username ? (
  //       <button type="button" onClick={handleRemoveClick}>
  //         remove
  //       </button>
  //     ) : null}
  //   </li>
  // );
  return (
    <li style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </li>
  );
};

const Blogs = (props) => {
  return (
    <ul>
      {props.blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // handleClick={() => {
          //   props.addLike(blog.id);
          //   props.setNotification(`you liked ${blog.title}`, 5);
          // }}
          // handleRemoveClick={() => {
          //   props.removeBlog(blog.id);
          //   props.setNotification(`you deleted ${blog.title}`, 5);
          // }}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

const mapDispatchToProps = {
  addLike,
  setNotification,
  removeBlog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
