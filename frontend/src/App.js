import "./App.css";
import Kirjautuminen from "./components/Kirjautuminen";
import Rekisteroityminen from "./components/Rekisteroityminen";
import Peli from "./components/Peli";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalState from "./context/GlobalState";
function App() {
  return <GlobalState>
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
            path="/laivanupotus/"
            element={<Rekisteroityminen />}
          />{" "}
          <Route
            path="/laivanupotus/:id"
            element={<Peli />}
          />{" "}
        </Routes>{" "}
      </div>{" "}
    </div>{" "}
  </Router>{" "}
</GlobalState>
}

export default App;
