import { createStore, combineReducers } from "redux";
import listaKorsinikaReducer from "./reducers/listaKorisnikaReducer";
const reducer = combineReducers({korisnici:listaKorsinikaReducer});

const initialState = {
    korisnici:{
        ime:"",
        prezime:"",
        email:""
}
};


const store = createStore(reducer,initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;