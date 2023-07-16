const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    obj = {
        a: "Notescloud.com"
    }

    res.json(obj)
})

module.exports = router 