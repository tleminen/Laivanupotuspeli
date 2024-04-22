import React, { useState, useEffect } from "react";
import kuva from "../image/SijoitusLaiva.png";
import kuva2 from "../image/osumaKuva.png";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import aani1 from "../image/osumaAani.mp3";
import aani2 from "../image/ohiAani.mp3";
import klikkaaminen from "../image/klikkaus.mp3";

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
  const [Suorakulmio, setSuorakulmio] = useState(false);
  const [osumanAANI] = useState(new Audio(aani1));
  const [ohiAANI] = useState(new Audio(aani2));
  const [klikAANI] = useState(new Audio(klikkaaminen));

  useEffect(() => {
    if (peliPaattynyt) {
      // pelin lopetustoiminnot tähän vielä
      setSuorakulmio(true);
      console.log("Peli päättyi");
    }
  }, [peliPaattynyt]);

  useEffect(() => {
    if (peliAlkaa && kayttajanVuoro === false) {
      const timer = setTimeout(() => {
        vastustajanVuoroKasittely();
      }, 3000);
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
        osumanAANI.play();
      } else {
        paivitaTaulukko[rivi][sarake] = 2;
        ohiAANI.play();
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
    klikAANI.play();
    klikAANI.volume = 1;
    setPeliPaattynyt(true);
  };

  return (
    <div className="peliAlusta">
      <table>
        <tbody>
          <tr>
            <div className="peliruudukot">
              {Suorakulmio && (
                <>
                  {" "}
                  <div className="suorakulmio"></div>{" "}
                  <p className="lopetusTeksti">Peli päättyi</p>
                </>
              )}
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
                            ruutu === -1
                              ? "red"
                              : ruutu === 2
                              ? "gray"
                              : "orange"
                          }
                        />
                      ))
                    )}
                </div>
              </div>
            </div>
          </tr>
          <tr>
            <div className="TulosSiirtyma"></div>
            {peliPaattynyt && (
              <Link to={`/laivanupotus/`}>
                <Button
                  onClick={kasitteleSiirtyminenTuloksiin}
                  variant="outline-warning"
                >
                  Siirry tuloksiin
                </Button>
              </Link>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Laivanupotus;
