import React, { useReducer } from "react";
import AppReducer from "./AppReducer";
import KayttajaContext from "./KayttajaContext";
import { GET_KAYTTAJAT, GET_KAYTTAJAID } from "./types";
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
      console.log("Saadut käyttäjätiedot:", data.posts);
      dispatch({ type: GET_KAYTTAJAT, payload: data.posts });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const postKirjautuminen = async (user, password) => {
    console.log("Käyttäjä globalstate: ", user, " Salasana ", password);
    try {
      const post = { Kayttajatunnus: user, Salasana: password };

      console.log("post: ", post);
      let res = await axios.post(`http://localhost:3000/laivanupotus/kirjaudu`, post);
      let { data } = res;
      console.log("GET_KAYTTAJAID:", data.posts);
      dispatch({ type: GET_KAYTTAJAID, payload: data.posts });

      //Palauttaa true, jos vastauksessa on käyttäjän ID
      return !!data.posts.length;
      //return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const setKayttaja = async (uusiKayttaja) => {
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
