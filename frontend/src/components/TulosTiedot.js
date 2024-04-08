import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import kayttajaContext from "../context/KayttajaContext";
import { useNavigate } from "react-router-dom";
import { Button } from "bootstrap";
const TulosTiedot = (props) => {
  const [naytaKayttaja, setNaytaKayttaja] = useState(false);
  let history = useNavigate();
  const onShowClick = (e) => {
    let lippu = !naytaKayttaja;
    setNaytaKayttaja(lippu);
  };
  const { Kayttajatunus, Pisteet } = props.kayttaja || {};
  return (
    <div className="card card-body bg-light mb-3">
      <h4 className="text-dark">
        {Kayttajatunus}{" "}
        <Button variant="outline-dark" onClick={onShowClick.bind(this)}>
          Lisätietoa
        </Button>
        <Link to={`/laivanupotus/peli`}>
          <Button variant="outline-primary">Pelaa uudestaan</Button>
        </Link>
      </h4>
      {naytaKayttaja ? (
        <ul className="list-group">
          <li className="list-group-item">Nimi: {Kayttajatunus}</li>
          <li className="list-group-item">Pisteet: {Pisteet}</li>
        </ul>
      ) : null}
    </div>
  );
};
/*Puhelintieto.propTypes = {
 yhteystieto: PropTypes.object.isRequired,
 //deleteClickHandler: PropTypes.func.isRequired,//ei tarvita enää
};*/
export default TulosTiedot;
