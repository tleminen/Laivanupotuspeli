import React, { Component } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContextKayttaja from "../context/KayttajaContext";
import klikkaaminen from "../image/klikkaus.mp3";

const LisaaKayttaja = () => {
  let navigate = useNavigate();

  const [Kayttajatunnus, setKayttajatunnus] = useState("");
  const [Salasana, setSalasana] = useState("");
  const [virheet, setVirheet] = useState("");
  const [Pisteet, setPisteet] = useState(0);
  const [klikAANI] = useState(new Audio(klikkaaminen));

  const KayttajaContext = useContext(ContextKayttaja);
  console.log(KayttajaContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    klikAANI.play();

    const uusiKayttaja = {
      Kayttajatunnus: Kayttajatunnus,
      Salasana: Salasana,
      Pisteet: Pisteet,
    };

    console.log("uusiKayttaja", uusiKayttaja);

    KayttajaContext.setKayttaja(uusiKayttaja);
    console.log("Onnistui");

    navigate("/");
  };

  const tallennaTieto = (e) => this.state({ [e.target.name]: e.target.value });

  return (
    <div>
      <h1 className="header">Rekisteröidy</h1>
      <div className="card-body">
        <form onSubmit={handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="Kayttajatunnus" className="teksti">
              Käyttäjätunnus
            </label>
            <input
              id="Kayttajatunnus"
              type="text"
              name="Kayttajatunnus"
              className="form-control form-control-lg"
              placeholder="Syötä käyttäjätunnus..."
              value={Kayttajatunnus}
              onChange={(event) => setKayttajatunnus(event.target.value)}
              error={virheet.Kayttajatunnus}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Salasana" className="teksti">
              Salasana
            </label>
            <input
              id="Salasana"
              type="text"
              name="Salasana"
              className="form-control form-control-lg"
              placeholder="Syötä salasana..."
              value={Salasana}
              onChange={(event) => setSalasana(event.target.value)}
              error={virheet.Salasana}
            />
          </div>
          <br></br>
          <input
            type="submit"
            value="Rekisteröidy"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default LisaaKayttaja;
