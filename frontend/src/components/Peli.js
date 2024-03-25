
import React, { useState, useEffect } from "react";
import "./App.css"; // Tuodaan tyylikirjasto

const Pelialusta = () => {
  const rivit = 4;
  const sarakkeet = 5;

  const [PelaajaTalukko, setPelaajaTaulukko] = useState(
    Array.from({ length: rivit }, () => Array(sarakkeet).fill(true))
  );
  const [VastustajaTaulukko, setVastustajaTaulukko] = useState(
    Array.from({ length: rivit }, () => Array(sarakkeet).fill(true))
  );
  const [Osuma, setOsuma] = useState(
    Array.from({ length: rivit }, () => Array(sarakkeet).fill(true))
  );

  //testausta.
  useEffect(() => {
    console.log("PelaajaTalukko:", PelaajaTalukko);
    console.log("VastustajaTaulukko:", VastustajaTaulukko);
    console.log("Osuma:", Osuma);
  }, [PelaajaTalukko, VastustajaTaulukko, Osuma]);

  const satunnaisValinta = () => {
    const rivi = Math.floor(Math.random() * rivit);
    const sarake = Math.floor(Math.random() * sarakkeet);
    return { rivi, sarake };
  };

  const asetaLaiva = () => {
    const VastustajaTaulukkoKopio = JSON.parse(
      JSON.stringify(VastustajaTaulukko)
=======
class Peli {
  constructor() {
    this.playerGrid = document.getElementById("playerGrid");
    this.opponentGrid = document.getElementById("opponentGrid");
    this.playerCells = [];
    this.opponentCells = [];
    this.ships = 5;
    this.gridSize = 20; // 4x5 grid
    this.initializeGrids();
    this.placeShips();
    this.playerGrid.addEventListener(
      "click",
      this.handlePlayerClick.bind(this)
>>>>>>> 05d35f4acdd4516ae33fe00927e19954d7a8fc2b
    );
  }

  initializeGrids() {
    for (let i = 0; i < this.gridSize; i++) {
      const playerCell = document.createElement("div");
      playerCell.classList.add("cell");
      playerCell.dataset.index = i;
      this.playerCells.push(playerCell);
      this.playerGrid.appendChild(playerCell);

      const opponentCell = document.createElement("div");
      opponentCell.classList.add("cell", "hidden");
      opponentCell.dataset.index = i;
      this.opponentCells.push(opponentCell);
      this.opponentGrid.appendChild(opponentCell);
    }
  }

  placeShips() {
    for (let i = 0; i < this.ships; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * this.gridSize);
      } while (this.opponentCells[randomIndex].classList.contains("ship"));
      this.opponentCells[randomIndex].classList.add("ship");
    }
  }

  handlePlayerClick(event) {
    if (event.target.classList.contains("cell")) {
      const index = event.target.dataset.index;
      const isHit = this.opponentCells[index].classList.contains("ship");
      if (isHit) {
        this.opponentCells[index].classList.add("hit");
        alert("Tähtäsit laivaan!");
      } else {
        this.opponentCells[index].classList.add("miss");
        alert("Ohitsit laivan.");
      }
    }
  }
}

// Luo peli-instanssi kun sivu on ladattu
document.addEventListener("DOMContentLoaded", () => {
  const peli = new Peli();
});
