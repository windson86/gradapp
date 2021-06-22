import { UPDATE_KORISNIKE } from "../actions/updateKorisnike";

const listaKorsinikaReducer = (state = {},{type,payload}) => {
    switch(type){
        case UPDATE_KORISNIKE :
            return {name:payload}
            default:
                return state
    };
};
export default listaKorsinikaReducer;