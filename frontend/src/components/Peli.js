import React, { useState, useEffect } from "react";

const Pelialusta = () => {
  const rivit = 4;
  const sarakkeet = 5;

  const [PelaajaTalukko, setPelaajaTaulukko] = useState(
    Array(rivit).fill(Array(sarakkeet).fill(false))
  );
  const [VastustajaTaulukko, setVastustajaTaulukko] = useState(
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
    const PelaajaTaulukkoKopio = JSON.parse(JSON.stringify(PelaajaTalukko));
    const VastustajaTaulukkoKopio = JSON.parse(
      JSON.stringify(VastustajaTaulukko)
    );

    for (let i = 0; i < 4; i++) {
      const pelaajaKoordinaatti = satunnaisValinta();
      const vastustajaKoordinaatti = satunnaisValinta();

      // Place player's ships
      PelaajaTaulukkoKopio[pelaajaKoordinaatti.row][
        pelaajaKoordinaatti.col
      ] = true;

      // Place opponent's ships
      VastustajaTaulukkoKopio[vastustajaKoordinaatti.rivi][
        vastustajaKoordinaatti.sarake
      ] = true;
    }

    setPelaajaTaulukko(PelaajaTaulukkoKopio);
    setVastustajaTaulukko(VastustajaTaulukkoKopio);
  };

  useEffect(() => {
    asetaLaiva();
  }, []);

  const handleAttack = (rivi, sarake) => {
    const osumaKopio = JSON.parse(JSON.stringify(Osuma));

    // Check if the attack hits opponent's ship
    if (VastustajaTaulukko[rivi][sarake]) {
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
            {PelaajaTalukko.map((rivi, rivipaikka) => (
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
            {Osuma.map((rivi, rivipaikka) => (
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
