import { useContext, useEffect } from "react";
import TulosTiedot from "./TulosTiedot";
import kayttajaContext from "../context/KayttajaContext";
import React from "react";

const Tulos = () => {
  const KayttajaContext = useContext(kayttajaContext);
  console.log(KayttajaContext);
  useEffect(() => {
    KayttajaContext.getKayttajat();

    console.log(KayttajaContext);
  }, []);

  if (KayttajaContext) {
    return (
      <>
        <h1 className="display-4 mb-2">
          <span className="header">Tulokset</span>
        </h1>

        <React.Fragment>
          {KayttajaContext.kayttajantiedot
            ? KayttajaContext.kayttajantiedot.map((kayttajanTieto) => (
                <TulosTiedot
                  key={kayttajanTieto && kayttajanTieto.id}
                  kayttajanTieto={kayttajanTieto}
                />
              ))
            : null}
        </React.Fragment>
      </>
    );
  } else return null;
};

export default Tulos;
