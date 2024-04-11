import React, { useState, useEffect } from "react";

const taulukkoRivit = 4;
const taulukkoSarakkeet = 5;

const toteutaTaulukko = () => {
  const taulukko = [];
  for (let i = 0; i < taulukkoRivit; i++) {
    taulukko.push(Array(taulukkoSarakkeet).fill(0));
  }
  return taulukko;
};

const Laiva = () => {
  return <div className="laiva" />;
};

const Ruutu = ({ value, onClick, color }) => {
  let sisalto = "";
  if (value === 0) {
    sisalto = "\u00A0";
  } else if (value === -1) {
    sisalto = "\u25A1";
  } else if (value === 1) {
    sisalto = <Laiva />;
  }
  return (
    <div className="ruutu" onClick={onClick} style={{ backgroundColor: color }}>
      {sisalto}
    </div>
  );
};

const Laivanupotus = () => {
  const [pelaajanTaulukko, setKayttajanTaulukko] = useState(toteutaTaulukko());
  const [vastustajanTaulukko, setVastustajanTaulukko] = useState(
    toteutaTaulukko()
  );
  const [kayttajanVuoro, setKayttajanVuoro] = useState(false);
  const [peliAlkaa, setPeliAlkaa] = useState(false);
  const [sijoitetutLaivat, setSijoitetutLaivat] = useState(0);

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
    if (paivitaTaulukko[rivi][sarake] === 0) {
      const satunnaisRivi = Math.floor(Math.random() * taulukkoRivit);
      const satunnaisSarake = Math.floor(Math.random() * taulukkoSarakkeet);
      if (pelaajanTaulukko[satunnaisRivi][satunnaisSarake] === 1) {
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
    if (peliAlkaa && !kayttajanVuoro) {
      const kayttajanTaulukonKopio = [...pelaajanTaulukko];
      let kayttajanVuoronKopio = false;
      for (let i = 0; i < taulukkoRivit; i++) {
        for (let j = 0; j < taulukkoSarakkeet; j++) {
          if (
            kayttajanTaulukonKopio[i][j] === 1 &&
            vastustajanTaulukko[i][j] === -1
          ) {
            kayttajanTaulukonKopio[i][j] = 3;
            kayttajanVuoronKopio = true;
          }
        }
      }
      setKayttajanTaulukko(kayttajanTaulukonKopio);
      setKayttajanVuoro(kayttajanVuoronKopio);
    }
  }, [kayttajanVuoro, peliAlkaa]);

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
                      ? "red"
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
        {peliAlkaa && !kayttajanVuoro && <div>Vastustajan vuoro</div>}
      </div>
    </div>
  );
};

export default Laivanupotus;
