import ContextKayttaja from "../context/KayttajaContext";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import kuva from "../image/logo.png";
const LOGIN_URL = "/auth";

const Kirjautuminen = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const KayttajaContext = useContext(ContextKayttaja);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = KayttajaContext.postKirjautuminen(user, password);

      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, password, roles, accessToken });
      setUser("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrorMessage("No Server Response");
      } else if (err.response?.status === 400) {
        setErrorMessage("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1 className="header">Olet kirjautunut sisään</h1>
          <br />
          <span className="line">
            <Link to="/laivanupotus/peli/">
              <button className="btn btn-primary rounded-circle btn-lg">
                Aloita peli
              </button>
            </Link>
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
          <img src={kuva} alt="Kirjautuminen Laivanupotuspeliin" className="kuvanKoko" />
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                className="form-control form-control-lg"
                placeholder="Syötä käyttäjätunnus"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </div>
            <br></br>
            <div className="form-group">
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Syötä salasana"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <br></br>
            <div className="form-group">
              <button className="btn btn-primary rounded-circle btn-lg">
                Kirjaudu sisään
              </button>
            </div>
          </form>
            <li>
              <Link to="/laivanupotus/rekisterointi" className="punainen">Luo uusi käyttäjä?
              </Link>
            </li>
        </section>
      )}
    </>
  );
};

export default Kirjautuminen;
