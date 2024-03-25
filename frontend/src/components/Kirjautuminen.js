
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Kirjautuminen = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      //setAuth({ user, pwd, roles, accessToken });
      //setUser("");
      //setPwd("");
      //setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        //setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        //setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        //setErrMsg("Unauthorized");
      } else {
        //setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Olet kirjautunut sisään</h1>
          <br />
          <span className="line">
            {/*put router link here*/}
            <a href="#">Aloita peli</a>
          </span>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errorMessage ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <h1>Kirjautuminen laivanupotuspeliin</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Käyttäjätunnus:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Salasana:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>Kirjaudu sisään</button>
          </form>
          <p>
          <li className="nav-item">
              <Link to="/laivanupotus/" className="nav-link">
              Luo uusi käyttäjä?
              </Link>
            </li>
          </p>
        </section>
      )}
    </>
  );
};

export default Kirjautuminen;
