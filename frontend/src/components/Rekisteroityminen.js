import React, { Component } from "react";
import { useState, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ContextKayttaja from "../context/KayttajaContext";

const LisaaKayttaja = () => {
    let history = useNavigate();

    const [Kayttajatunnus, setKayttajatunnus] = useState("");
    const [Pisteet, setPisteet] = useState("");
    const [Salasana, setSalasana] = useState("");

    const KayttajaContext = useContext(ContextKayttaja);

    const handleSubmit = async (e) => {
        const uusiKayttaja = {
            kayttajatunnus: Kayttajatunnus,
            pisteet: Pisteet,
            salasana: Salasana,

        };

        console.log("uusiKayttaja", uusiKayttaja);

        KayttajaContext.setKayttajanTiedot(uusiKayttaja);

        window.location.reload();

        history("/");

    }; 

    const tallennaTieto = (e) => 

    this.state({ [e.target.name]: e.target.value });

    return (
        <div className="card mb-3">
            <div className="card-header">Rekisteröidy</div> 
            <div className="card-body">
                <form onSubmit={handleSubmit.bind(this)}> 
                <div className="form-group">
                    <label htmlFor="Kayttajatunnus">Käyttäjätunnus</label> 
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
                    
                    <div className="invalid-feedback">Rekisteröidy</div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="Salasana">Salasana</label> 
                    <input
                    id="Salasana"
                    type="text"
                    name="Salasana"
                    className="form-control form-control-lg" 
                    placeholder="Syötä salasana..."
                    value={Sukunimi}
                    onChange={(event) => setSalasana(event.target.value)} 
                    error={virheet.Salasana}
                    />

                    <div className="invalid-feedback">Rekisteröidy</div>
                    </div>
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

                    export default Rekisteroityminen;
