const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    obj = {
        a: "Notescoud.com"
    }

    res.json(obj)
})

module.exports = router