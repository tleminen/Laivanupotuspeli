import { useContext, useEffect } from "react";
import TulosTiedot from "./TulosTiedot";
import kayttajaContext from "../context/KayttajaContext";
import React from "react";

const Tulos = () => {
  const KayttajaContext = useContext(kayttajaContext);
  console.log("Käyttäjät: ", KayttajaContext.kayttajat);


  useEffect(() => {
    KayttajaContext.getKayttajat().then(() => {
        KayttajaContext.getKayttajat();
        console.log("Käyttäjät haettu onnistuneesti");
      }).catch((error) => {
        console.error("Virhe käyttäjätietojen haussa:", error);
      });
  }, []);

  return (
    <>
      <h1 className="display-4 mb-2">
        <span className="header">Urheilijat</span>
      </h1>
      {KayttajaContext.kayttajat.length ? ( // Tarkistetaan, onko käyttäjätietoja saatavilla
      <React.Fragment>
        {KayttajaContext.kayttajat.map((kayttajanTieto) => (
          <TulosTiedot
            key={kayttajanTieto && kayttajanTieto.id}
            kayttajanTieto={kayttajanTieto}
          />
        ))}
      </React.Fragment>
    ) : (
      <p>Ei käyttäjätietoja saatavilla</p> // Näytetään ilmoitus, jos käyttäjätietoja ei ole saatavilla
    )}
    </>
  );
};

export default Tulos;
