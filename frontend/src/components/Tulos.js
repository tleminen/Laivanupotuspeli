import React, { Component, useContext, useEffect } from "react";
import TulosTiedot from "./TulosTiedot";
import kayttajaContext from "../context/KayttajaContext";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Tulos = () => {
  const KayttajaContext = useContext(kayttajaContext);
  console.log("Käyttäjät: ", KayttajaContext.kayttajat);

  useEffect(() => {
    KayttajaContext.getKayttajat()
        console.log("Käyttäjät haettu onnistuneesti"+KayttajaContext.getKayttajat());
  }, []);
  

  console.log("ennen return: "+KayttajaContext.kayttajat)

  return (
    <>
      <h1 className="display-4 mb-2">
        <span className="header">Tulokset</span>
      </h1>
      <React.Fragment>
        <div className="tulosBoksi">

        {KayttajaContext.kayttajat.length
          ? KayttajaContext.kayttajat.map((kayttaja) => (
              <TulosTiedot key={kayttaja && kayttaja.id} kayttaja={kayttaja} />
            ))
          : null}
          </div>
          <div>
          <Link to={`/`}>
          <Button variant="outline-danger">Kirjaudu ulos</Button>
          </Link>
          <Link to={`/laivanupotus/peli`}>
          <Button variant="outline-success">Pelaa uudelleen</Button>
          </Link>
          </div>
      </React.Fragment>
    </>
  );
};

export default Tulos;
