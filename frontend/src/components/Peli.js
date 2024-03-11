import React, { useState, useEffect } from "react";

const Pelialusta = () => {
  const rivit = 4;
  const sarakkeet = 5;

  const [PelaajaAlusta, setPelaajaAlusta] = useState(
    Array(rivit).fill(Array(sarakkeet).fill(false))
  );
  const [VastustajaAlusta, setVastustajaAlusta] = useState(
    Array(rivit).fill(Array(sarakkeet).fill(false))
  );
  const [Osuma, setOsuma] = useState(
    Array(rivit).fill(Array(sarakkeet).fill(false))
  );

  const satunnaisValinta = () => {
    const rivi = Math.floor(Math.random() * rivit);
    const sarake = Math.floor(Math.random() * sarakkeet);
    return { rivi, sarake };
  };

  const asetaLaiva = () => {
    const PelaajaAlustaKopio = JSON.parse(JSON.stringify(PelaajaAlusta));
    const VastustajaAlustaKopio = JSON.parse(JSON.stringify(VastustajaAlusta));

    for (let i = 0; i < 4; i++) {
      const pelaajaKoordinaatti = satunnaisValinta();
      const vastustajaKoordinaatti = satunnaisValinta();

      // Place player's ships
      PelaajaAlustaKopio[pelaajaKoordinaatti.row][
        pelaajaKoordinaatti.col
      ] = true;

      // Place opponent's ships
      VastustajaAlustaKopio[vastustajaKoordinaatti.rivi][
        vastustajaKoordinaatti.sarake
      ] = true;
    }

    setPelaajaAlusta(PelaajaAlustaKopio);
    setVastustajaAlusta(VastustajaAlustaKopio);
  };

  useEffect(() => {
    asetaLaiva();
  }, []);

  const handleAttack = (rivi, sarake) => {
    const osumaKopio = JSON.parse(JSON.stringify(Osuma));

    // Check if the attack hits opponent's ship
    if (VastustajaAlusta[rivi][sarake]) {
      osumaKopio[rivi][sarake] = true;
    }

    setOsuma(osumaKopio);
  };

  return (
    <div>
      <div>
        <h2>Oma kenttä</h2>
        <table>
          <tbody>
            {PelaajaAlusta.map((rivi, rivipaikka) => (
              <tr key={rivipaikka}>
                {rivi.map((cell, sarakepaikka) => (
                  <td key={sarakepaikka} className={cell ? "laiva" : ""}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Vastustajan kenttä</h2>
        <table>
          <tbody>
            {hits.map((rivi, rowIndex) => (
              <tr key={rivipaikka}>
                {rivi.map((cell, sarakepaikka) => (
                  <td
                    key={sarakepaikka}
                    className={cell ? "osuma" : ""}
                    onClick={() => handleAttack(rivipaikka, sarakepaikka)}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pelialusta;
