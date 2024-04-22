import "./App.css";
import Kirjautuminen from "./components/Kirjautuminen";
import Rekisteroityminen from "./components/Rekisteroityminen";
import Peli from "./components/Peli";
import Tulos from "./components/Tulos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalState from "./context/GlobalState";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import taustamusa from "./image/taustamusiikki.mp3";

const App = () => {
  const [musiikki] = useState(new Audio(taustamusa));

  useEffect(() => {
    musiikki.volume = 0.2;
    musiikki.loop = true;

    const handleClick = () => {
      musiikki.play();
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);

    return () => {
      musiikki.pause();
    };
  }, [musiikki]);

  return (
    <GlobalState>
      <div className="taustaKuva">
        {" "}
        <Router>
          {" "}
          <div className="App">
            {" "}
            <div className="container">
              {" "}
              <Routes>
                {" "}
                <Route path="/" element={<Kirjautuminen />} />{" "}
                <Route
                  path="/laivanupotus/rekisterointi/"
                  element={<Rekisteroityminen />}
                />{" "}
                <Route path="/laivanupotus/peli" element={<Peli />} />{" "}
                <Route path="/laivanupotus/" element={<Tulos />} />{" "}
              </Routes>{" "}
            </div>{" "}
          </div>{" "}
        </Router>{" "}
      </div>
    </GlobalState>
  );
};

export default App;
