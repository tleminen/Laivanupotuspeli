import { useContext, useEffect } from "react";
import TulosTiedot from "./TulosTiedot";
import kayttajaContext from "../context/KayttajaContext";
import React from "react";

const Tulos = () => {
  const KayttajaContext = useContext(kayttajaContext);
  console.log(KayttajaContext);
  useEffect(() => {
    KayttajaContext.getKayttajat().then(() => {
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
      <React.Fragment>
        {KayttajaContext.kayttajat.length
          ? KayttajaContext.kayttajat.map((kayttaja) => (
              <TulosTiedot key={kayttaja && kayttaja.id} kayttaja={kayttaja} />
            ))
          : null}
      </React.Fragment>
    </>
  );
};

export default Tulos;
