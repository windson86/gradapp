const express = require('express')

const router = express.Router();

const BlogPost = require('../modeli/Blogpost');

router.get("/api",(req,res)=>{
   
    BlogPost.find({})
    .then((data)=>{
        console.log("podaci:",data);
        res.json(data)
    })
    .catch((error)=>{
        console.log("error:",error)
    });
    
});

router.post("/api/save",(req,res)=>{
    const data={
        username:"petrovic",
        age:34

    };
    res.json(data)
});

router.get("/api/ime",(req,res)=>{
    const data={
        username:"petrovic",
        age:34

    };
    res.json(data)
});

module.exports = router;