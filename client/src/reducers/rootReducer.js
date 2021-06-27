

const initialState = {
  reduxKorisnici: [],
  dolazniKorisnici:[]
};

function rootReducer(state = initialState, action) {
  


  
  if (action.type === "DATA_LOADED") {
    return Object.assign({}, state, {
      dolazniKorisnici: state.dolazniKorisnici.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;