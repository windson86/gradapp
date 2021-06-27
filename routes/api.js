const express = require('express')

const router = express.Router();

const Korisnici = require('../modeli/Korisnik');

router.get("/api",(req,res)=>{
   
    Korisnici.find({})
    .then((data)=>{
        
        res.json(data)
    })
    .catch((error)=>{
        console.log("error:",error)
    });
    
});
router.post('/api/deleteOne',(req,res)=>{
    console.log("deletano",req.body._id);
Korisnici.deleteOne({"_id":req.body._id}, function(err) {
    if (!err) {
            
    }
    else {
           console.log("error deletanja",err)
    }
})


});

router.post('/api/save', (req, res) => {
    const data = req.body.payload;
    
    const noviKorisnik = new Korisnici(data);

    noviKorisnik.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'server error' });
            return;
        }
        
        return res.json({
            msg: 'podaci spremljeni'
        });
    });
});



module.exports = router;