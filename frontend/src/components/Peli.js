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
    const VastustajaTaulukkoKopio = JSON.parse(
      JSON.stringify(VastustajaTaulukko)
    );

    for (let i = 0; i < 4; i++) {
      const vastustajaKoordinaatti = satunnaisValinta();

      // Vastustajan laivojen asetus

      VastustajaTaulukkoKopio[vastustajaKoordinaatti.rivi][
        vastustajaKoordinaatti.sarake
      ] = true;
    }

    setVastustajaTaulukko(VastustajaTaulukkoKopio);
  };

  useEffect(() => {
    asetaLaiva();
  }, []);

  const kasittelePelaajanLaiva = (rivi, sarake) => {
    const PelaajaTaulukkoKopio = JSON.parse(JSON.stringify(PelaajaTalukko));

    // Pelaajan laivojen asetus.

    PelaajaTaulukkoKopio[rivi][sarake] = true;
    setPelaajaTaulukko(PelaajaTaulukkoKopio);
  };

  const kasitteleHyokkays = (rivi, sarake) => {
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
                  <td
                    key={sarakepaikka}
                    className={cell ? "laiva" : ""}
                    style={{ backgroundColor: cell ? "navy" : "inherit" }}
                    onClick={() =>
                      kasittelePelaajanLaiva(rivipaikka, sarakepaikka)
                    }
                  ></td>
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
                    onClick={() => kasitteleHyokkays(rivipaikka, sarakepaikka)}
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
