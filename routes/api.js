const express = require('express')

const router = express.Router();

const Korisnici = require('../modeli/Korisnik');

router.get("/api",(req,res)=>{
   
    Korisnici.find({})
    .then((data)=>{
        console.log("podaci:",data);
        res.json(data)
    })
    .catch((error)=>{
        console.log("error:",error)
    });
    
});
router.post('/api/deleteOne',(req,res)=>{
console.log("dolazdelete:",req.body)
Korisnici.deleteOne({"_id":req.body}, function(err) {
    if (!err) {
            console.log("deletano");
    }
    else {
           console.log("error deletanja",err)
    }
})


});

router.post('/api/save', (req, res) => {
    const data = req.body;
        console.log("dolazni data",req.body)
    const noviKorisnik = new Korisnici(data);

    noviKorisnik.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'jbga server error' });
            return;
        }
        
        return res.json({
            msg: 'podaci spremljeni'
        });
    });
});

router.get("/api/ime",(req,res)=>{
    const data={
        username:"petrovic",
        age:34

    };
    res.json(data)
});

module.exports = router;