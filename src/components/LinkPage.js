import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <section>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/login">Login</Link>

      <br />
      <h2>Private</h2>
      <Link to="/">Home</Link>
      <br />
      <Link to="/manager">Editors Page</Link>
      <br />
      <Link to="/admin">Admin Page</Link>
      <br />
    </section>
  );
};

export default LinkPage;
