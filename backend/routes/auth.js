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


router.post("/createuser", [
    body("name", "Enter a valid name : ").isLength({ min: 5 }),
    body("email", "Enter a valid email : ").isEmail(),
    body("password", "Password should be min. 5 characters long : ").isLength({ min: 5 })

    // In above validations, the second parameter is optional, it is sent to the client when any error occurs (i.e validation fails)    
],
    (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            // return res.send(`Hello, ${req.body.name}!`);


            // Below we are using .create() method on User (which is a mongoose model imported above) in the .create() method, we provide the user info.

            User.create({                                       // The .create() method calls the .save() method of mongoose to save the user as a new document into databasse.
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }).then(user => res.send(user))
                .catch(error => {
                    console.log(error);;
                    res.send(error+  "\n E-mail already registered, please use a different email id" )
                }
                )
        }

        else {
            res.send({ errors: result.array() });
        }
    }
)

module.exports = router