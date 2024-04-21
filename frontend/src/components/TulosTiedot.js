import React, { Component, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import KayttajaContext from "../context/KayttajaContext";
const TulosTiedot = ({ kayttaja }) => {
  console.log("TulosTiedot props:", kayttaja);

  let navigate = useNavigate();
  const contextKayttaja = useContext(KayttajaContext);
  const onUpdateClick = (Id) => {
    contextKayttaja.updateKayttajaPisteet(Id);
    navigate("/");
  };

  const { Id, Kayttajatunnus, Pisteet } = kayttaja || {};
  return (
    <div>
      <h1 className="tulosTeksti">
        {Kayttajatunnus} pst: {Pisteet}{" "}
        <Button onClick={onUpdateClick.bind(this, {Id})}>+1</Button>
      </h1>
    </div>
  );
};
/*Puhelintieto.propTypes = {
 yhteystieto: PropTypes.object.isRequired,
 //deleteClickHandler: PropTypes.func.isRequired,//ei tarvita enää
};*/
export default TulosTiedot;
