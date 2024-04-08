import React, { useReducer } from "react";
import AppReducer from "./AppReducer";
import KayttajaContext from "./KayttajaContext";
import { GET_KAYTTAJAT } from "./types";
import axios from "axios";
const GlobalState = (props) => {
  //initial state
  let initialState = {
    kayttajat: [],
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const getKayttajat = async () => {
    try {
      let res = await axios.get("http://localhost:3000/laivanupotus");
      let { data } = res;
      dispatch({ type: GET_KAYTTAJAT, payload: data.posts });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const postKirjautuminen = async (user, password) => {
    try {
      let sql = `http://localhost:3000/laivanupotus/`;
      const post = { Kayttajatunnus: user, Salasana: password };
      //let res = await axios.post(sql, JSON.stringify(user, password));
      let res = await axios.post(sql, JSON.stringify(post));
      let { data } = res;
      console.log("GET_KAYTTAJAID:");
      dispatch({ type: "GET_KAYTTAJAID", payload: data.posts });
      //return data;
    } catch (error) {
      console.error(error);
    }
  };
  const setKayttaja = async (uusiKayttaja) => {
    console.log("printtaa tähän: "+JSON.stringify(uusiKayttaja));
    try {
      const res = await axios
        .post(`http://localhost:3000/laivanupotus`, uusiKayttaja)
        .then((res) => {
          dispatch({ type: "ADD_KAYTTAJA", payload: res.data });
          console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const updateKayttajaPisteet = async (id) => {
    try {
      const res = await axios
        .put(`http://localhost:3000/laivanupotus/${id}`)
        .then((res) => {
          dispatch({ type: "EDIT_KAYTTAJA", payload: res.data });
          console.log(res.data.posts);
        });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KayttajaContext.Provider
      value={{
        kayttajat: state.kayttajat,
        setKayttaja,
        getKayttajat,
        postKirjautuminen,
        updateKayttajaPisteet,
      }}
    >
      {props.children}
    </KayttajaContext.Provider>
  );
};
//};
export default GlobalState;
