import React, { Component, useContext, useEffect } from "react";
import TulosTiedot from "./TulosTiedot";
import kayttajaContext from "../context/KayttajaContext";
import Button from "react-bootstrap/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import klikkaaminen from "../image/klikkaus.mp3";
import AuthContext from "../context/AuthProvider";

const Tulos = () => {
  const KayttajaContext = useContext(kayttajaContext);
  console.log("Käyttäjät: ", KayttajaContext.kayttajat);

  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    KayttajaContext.getKayttajat();
    console.log(
      "Käyttäjät haettu onnistuneesti" + KayttajaContext.getKayttajat()
    );
  }, []);

  console.log("ennen return: " + KayttajaContext.kayttajat);

  const NappuloidenPainallusAani = () => {
    const click = new Audio(klikkaaminen);
    click.play();
  };

  const navigate = useNavigate();

  const handleKirjauduUlos = () => {
    setAuth(false);
    navigate("/");
  };

  if (!auth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1 className="display-4 mb-2">
        <span className="header">Tulokset</span>
      </h1>
      <React.Fragment>
        <div className="tulosBoksi">
          {KayttajaContext.kayttajat.length
            ? KayttajaContext.kayttajat.map((kayttaja) => (
                <TulosTiedot
                  key={kayttaja && kayttaja.id}
                  kayttaja={kayttaja}
                />
              ))
            : null}
        </div>
        <div>
          <Link to={`/`}>
            <Button
              variant="outline-danger"
              onClick={() => {
                handleKirjauduUlos();
                NappuloidenPainallusAani();
              }}
            >
              Kirjaudu ulos
            </Button>
          </Link>
          <Link to={`/laivanupotus/peli`}>
            <Button
              variant="outline-success"
              onClick={NappuloidenPainallusAani}
            >
              Pelaa uudelleen
            </Button>
          </Link>
        </div>
      </React.Fragment>
    </>
  );
};

export default Tulos;
