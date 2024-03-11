import React, { useState, useEffect } from "react";

const Pelialusta = () => {
  const rivit = 4;
  const sarakeet = 5;

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
      VastustajaAlustaKopio[vastustajaKoordinaatti.row][
        vastustajaKoordinaatti.col
      ] = true;
    }

    setPelaajaAlusta(PelaajaAlustaKopio);
    setVastustajaAlusta(VastustajaAlustaKopio);
  };

  useEffect(() => {
    asetaLaiva();
  }, []);

  const handleAttack = (rivi, sarake) => {
    const hitsCopy = JSON.parse(JSON.stringify(hits));

    // Check if the attack hits opponent's ship
    if (VastustajaAlusta[rivi][sarake]) {
      hitsCopy[rivi][sarake] = true;
    }

    setHits(hitsCopy);
  };

  return (
    <div>
      <div>
        <h2>Your Board</h2>
        <table>
          <tbody>
            {playerBoard.map((rivi, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className={cell ? "ship" : ""}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Opponent's Board</h2>
        <table>
          <tbody>
            {hits.map((rivi, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={cell ? "hit" : ""}
                    onClick={() => handleAttack(rowIndex, colIndex)}
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
