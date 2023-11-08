import { Link } from "react-router-dom";

const Unauthorized = () => {
  // const navigate = useNavigate();

  // const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        {/* <button onClick={goBack}>Go Back</button> */}
        <Link to="/">Go Homepage</Link>
      </div>
    </section>
  );
};

export default Unauthorized;
