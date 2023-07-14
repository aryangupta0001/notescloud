const express = require("express");
const router = express.Router();
const User = require("../models/User")

const { query, body } = require('express-validator');

router.get("/", (req, res) => {
    obj = {
        a: "Authentication" 
    }

    res.json(obj)
})

router.get("/hello", (req, res) => {
    console.log(req.body);

    res.send(req.body);
})


router.post("/", [
    body("name").isLength({min: 5}),
    body("email").isEmail(),
    body("password").isLength({min: 5})
], (req, res) => {  
    const user = User(req.body);
    user.save();
    res.send(req.body);
})

module.exports = router