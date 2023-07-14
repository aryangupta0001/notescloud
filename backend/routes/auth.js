const express = require("express");
const router = express.Router();
const User = require("../models/User")


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


router.post("/", (req, res) => {
    const user = User(req.body);
    user.save();
    res.send(req.body);
})

module.exports = router