import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
const TulosTiedot = ({ kayttaja }) => {
  console.log("TulosTiedot props:", kayttaja);
  let history = useNavigate();
  const { Kayttajatunnus, Pisteet } = kayttaja || {};
  return (
    <div>
        <h1 className="tulosTeksti">
        {Kayttajatunnus} pst: {Pisteet}
        </h1>
    </div>
    
    
  );
};
/*Puhelintieto.propTypes = {
 yhteystieto: PropTypes.object.isRequired,
 //deleteClickHandler: PropTypes.func.isRequired,//ei tarvita enää
};*/
export default TulosTiedot;
