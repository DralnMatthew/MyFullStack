import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Page, Input, Button, Footer, Navigation } from "../style";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <Page>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>

        <tbody>
          {users.map(({ id, name, blogs }) => (
            <tr key={id}>
              <td>
                <Link to={`/users/${id}`}>{name}</Link>
              </td>
              <td>{blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
};

export default Users;
