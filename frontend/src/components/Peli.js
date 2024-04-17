import React, { useState, useEffect } from "react";
import kuva from "../image/SijoitusLaiva.png";
import kuva2 from "../image/osumaKuva.png";

const taulukkoRivit = 4;
const taulukkoSarakkeet = 5;

const toteutaTaulukko = () => {
  const taulukko = [];
  for (let i = 0; i < taulukkoRivit; i++) {
    taulukko.push(Array(taulukkoSarakkeet).fill(0));
  }
  return taulukko;
};

const toteutaVastustajanTaulukko = () => {
  const taulukko = [];
  for (let i = 0; i < taulukkoRivit; i++) {
    taulukko.push(Array(taulukkoSarakkeet).fill(0));
  }
  for (let i = 0; i < 5; i++) {
    var etsiLaivaPaikka = true;
    while (etsiLaivaPaikka) {
      const satunnaisRivi = Math.floor(Math.random() * taulukkoRivit);
      const satunnaisSarake = Math.floor(Math.random() * taulukkoSarakkeet);
      if (taulukko[satunnaisRivi][satunnaisSarake] === 0) {
        taulukko[satunnaisRivi][satunnaisSarake] = 3;
        etsiLaivaPaikka = false;
      }
    }
  }
  return taulukko;
};

const Laiva = () => {
  return (
    <img src={kuva} alt="laiva" style={{ width: "50px", height: "50px" }} />
  );
};

const Ruutu = ({ value, onClick, color }) => {
  let sisalto = "";
  if (value === 0 || value === 3) {
    sisalto = "\u00A0";
  } else if (value === -1) {
    sisalto = "\u25A1";
  } else if (value === 1) {
    sisalto = <Laiva />;
  }
  return (
    <div className="ruutu" onClick={onClick} style={{ backgroundColor: color }}>
      {value === -1 ? (
        <img
          src={kuva2}
          alt="osuma"
          style={{ width: "50px", height: "50px" }}
        />
      ) : (
        sisalto
      )}
    </div>
  );
};

const Laivanupotus = () => {
  const [pelaajanTaulukko, setKayttajanTaulukko] = useState(toteutaTaulukko());
  const [vastustajanTaulukko, setVastustajanTaulukko] = useState(
    toteutaVastustajanTaulukko()
  );
  const [kayttajanVuoro, setKayttajanVuoro] = useState(false);
  const [peliAlkaa, setPeliAlkaa] = useState(false);
  const [sijoitetutLaivat, setSijoitetutLaivat] = useState(0);
  const [peliPaattynyt, setPeliPaattynyt] = useState(false);

  useEffect(() => {
    if (peliPaattynyt) {
      // pelin lopetustoiminnot tähän vielä
      console.log("Peli päättyi");
    }
  }, [peliPaattynyt]);

  useEffect(() => {
    if (peliAlkaa && kayttajanVuoro === false) {
      const timer = setTimeout(() => {
        vastustajanVuoroKasittely();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [kayttajanVuoro, peliAlkaa]);

  const pelaajanKlikkausKasittely = (rivi, sarake) => {
    if (peliAlkaa || kayttajanVuoro || sijoitetutLaivat >= 5) {
      return;
    }

    const paivitaTaulukko = [...pelaajanTaulukko];
    if (paivitaTaulukko[rivi][sarake] === 0) {
      paivitaTaulukko[rivi][sarake] = 1;
      setSijoitetutLaivat(sijoitetutLaivat + 1);
    }
    setKayttajanTaulukko(paivitaTaulukko);

    if (sijoitetutLaivat === 4) {
      setPeliAlkaa(true);
      setKayttajanVuoro(true);
    }
  };

  const ruudunKlikkausKasittely = (rivi, sarake) => {
    if (!peliAlkaa || !kayttajanVuoro) {
      return;
    }

    const paivitaTaulukko = [...vastustajanTaulukko];
    if (
      paivitaTaulukko[rivi][sarake] === 0 ||
      paivitaTaulukko[rivi][sarake] === 3
    ) {
      if (paivitaTaulukko[rivi][sarake] === 3) {
        paivitaTaulukko[rivi][sarake] = -1;
      } else {
        paivitaTaulukko[rivi][sarake] = 2;
      }
      setVastustajanTaulukko(paivitaTaulukko);
      setKayttajanVuoro(false);
    }
  };

  const vastustajanVuoroKasittely = () => {
    const paivitaTaulukko = [...pelaajanTaulukko];
    let satunnaisRivi, satunnaisSarake;
    do {
      satunnaisRivi = Math.floor(Math.random() * taulukkoRivit);
      satunnaisSarake = Math.floor(Math.random() * taulukkoSarakkeet);
    } while (
      paivitaTaulukko[satunnaisRivi][satunnaisSarake] !== 0 &&
      paivitaTaulukko[satunnaisRivi][satunnaisSarake] !== 1
    );

    if (paivitaTaulukko[satunnaisRivi][satunnaisSarake] === 1) {
      paivitaTaulukko[satunnaisRivi][satunnaisSarake] = -1;
    } else {
      paivitaTaulukko[satunnaisRivi][satunnaisSarake] = 2;
    }
    setKayttajanTaulukko(paivitaTaulukko);
    setKayttajanVuoro(true);
  };

  useEffect(() => {
    const tarkistaVoitto = (taulukko) => {
      let upotetut = 0;
      for (let i = 0; i < taulukko.length; i++) {
        for (let j = 0; j < taulukko[i].length; j++) {
          if (taulukko[i][j] === -1) {
            upotetut++;
          }
        }
      }
      return upotetut === 5;
    };

    if (peliAlkaa) {
      const pelaajanVoitto = tarkistaVoitto(vastustajanTaulukko);
      const vastustajanVoitto = tarkistaVoitto(pelaajanTaulukko);

      if (pelaajanVoitto || vastustajanVoitto) {
        setPeliPaattynyt(true);
      }
    }
  }, [peliAlkaa, pelaajanTaulukko, vastustajanTaulukko]);

  const kasitteleSiirtyminenTuloksiin = () => {
    setPeliPaattynyt(true);
  };

  return (
    <div className="peliAlusta">
      <div className="peliruudukot">
        <div className="taulukko">
          <div className="kayttajanTaulukko">
            {pelaajanTaulukko.map((rivi, riviPaikka) =>
              rivi.map((ruutu, sarakePaikka) => (
                <Ruutu
                  key={`käyttäjä-${riviPaikka}-${sarakePaikka}`}
                  value={ruutu}
                  onClick={() =>
                    pelaajanKlikkausKasittely(riviPaikka, sarakePaikka)
                  }
                  color={
                    ruutu === -1
                      ? "red"
                      : ruutu === 2
                      ? "gray"
                      : ruutu === 3
                      ? "orange"
                      : "blue"
                  }
                />
              ))
            )}
          </div>
          <div className="vali" />
          <div className="vastustajanTaulukko">
            {peliAlkaa &&
              vastustajanTaulukko.map((rivi, riviPaikka) =>
                rivi.map((ruutu, sarakePaikka) => (
                  <Ruutu
                    key={`vastustaja-${riviPaikka}-${sarakePaikka}`}
                    value={ruutu}
                    onClick={() =>
                      ruudunKlikkausKasittely(riviPaikka, sarakePaikka)
                    }
                    color={
                      ruutu === -1 ? "red" : ruutu === 2 ? "gray" : "orange"
                    }
                  />
                ))
              )}
          </div>
        </div>
      </div>
      {peliPaattynyt && (
        <button onClick={kasitteleSiirtyminenTuloksiin}>
          Siirry tulosnäkymään
        </button>
      )}
    </div>
  );
};

export default Laivanupotus;
