import axios from "axios";
export function deleteKorisnikaID(payload) {
    console.log("payload",payload)
    
    return function(){

      axios.post('/api/deleteOne', {
        _id:payload
      })
      .then((data) => {
       
        console.log("data:",data)
       })

     
  };
}

export function addKorisnika(payload) {
   
    return function(){
     
      axios.post('/api/save', {
        payload
      })
      .then((data) => {
       
        console.log("data:",data)
       })
    
  };
}
  export function getData() {
      
    return function(dispatch) {
      return fetch("/api")
        .then(response => response.json())
        .then(json => {
         dispatch({ type: "DATA_LOADED", payload: json });
        });
    };
  }