import React, { Component, useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import KayttajaContext from "../context/KayttajaContext";
const TulosTiedot = ({ kayttaja }) => {
  console.log("TulosTiedot props:", kayttaja);

  const [pisteet, setPisteet] = useState(kayttaja.Pisteet);

  let navigate = useNavigate();
  const contextKayttaja = useContext(KayttajaContext);
  const onUpdateClick = (Id) => {
    contextKayttaja.updateKayttajaPisteet(Id);
    //window.location.reload();
    setPisteet(pisteet + 1);
    navigate(".", { replace: true });
  };

  const { Id, Kayttajatunnus } = kayttaja || {};
  return (
      <div>
      <h1 className="tulosTeksti">
        {Kayttajatunnus} pst: {pisteet}{" "}
        <Button variant="outline-light" onClick={onUpdateClick.bind(this, {Id})}>+1</Button>
      </h1>
    </div>
    
  );
};
export default TulosTiedot;
