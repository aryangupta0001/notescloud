const express = require("express");
const router = express.Router();
const User = require("../models/User")

const { body, validationResult } = require('express-validator');

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
    body("name", "Enter a valid name : ").isLength({ min: 5 }),
    body("email", "Enter a valid email : ").isEmail(),
    body("password", "Password should be min. 5 characters long : ").isLength({ min: 5 })

    // In above validations, the second parameter is optional, it is sent to the client when any error occurs (i.e validation fails)    
],
    (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            // return res.send(`Hello, ${req.body.name}!`);
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }).then(user => res.send(user));
        }

        else {
            res.send({ errors: result.array() });
        }
    }
)

module.exports = router