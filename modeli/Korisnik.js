const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const KorisnikSchema = new Schema({
    ime:String,
    prezime:String,
    email:String
    
});

const Korisnik = mongoose.model("Korisnik",KorisnikSchema);

module.exports = Korisnik;