import { useParams } from "react-router-dom";
import { Page, Input, Button, Footer, Navigation } from "../style";

const Auser = ({ theUser }) => {
  return (
    <ul>
      {theUser.blogs.map((blog) => (
        <li>{blog.title}</li>
      ))}
    </ul>
  );
};

export default Auser;
