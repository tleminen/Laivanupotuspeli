export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_KAYTTAJAT":
      return {
        ...state,
        kayttajat: payload,
      };
    case "GET_KAYTTAJAID":
      return {
        ...state,
        kayttajat: payload,
      };
    case "ADD_KAYTTAJA":
      return {
        ...state,
        kayttajat: [action.payload, ...state.kayttajat],
      };
    case "EDIT_KAYTTAJA":
      return {
        ...state,
        kayttajat: (state.kayttajat || []).map((kayttajatieto) =>
          kayttajatieto && kayttajatieto.id === action.payload.id
            ? { ...kayttajatieto, ...action.payload }
            : kayttajatieto
        ),
      };
    default:
      return state;
  }
};
