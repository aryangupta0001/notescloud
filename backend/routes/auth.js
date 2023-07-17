const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_TOKEN = "ItsAryan";



const { body, validationResult } = require('express-validator');
const { useReducer } = require("react");

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


// Endpoint to create new user by sending data through POST request.

router.post("/createuser", [
    body("name", "Enter a valid name : ").isLength({ min: 5 }),
    body("email", "Enter a valid email : ").isEmail(),
    body("password", "Password should be min. 5 characters long : ").isLength({ min: 5 })

    // In above validations, the second parameter is optional, it is sent to the client when any error occurs (i.e validation fails)    
],
    async (req, res) => {

        // To validate the results according to the model defined.
        const result = validationResult(req);

        if (result.isEmpty()) {         // checks whether the resullt object is empty or not, if it is empty,  it means there are no validation errors & all values are valid.

            try {
                const user = await User.findOne({ email: req.body.email });         // It finds for the  document with same e-mail idd that is provided in current request.

                if (user) {             // If any doocument with current e-mail id is available in collection, it means it is duplicate.
                    return res.status(400).json({ error: "A user with this email already exists" });
                }

                else {
                    // Below we are using .create() method on User (which is a mongoose model imported above) in the .create() method, we provide the user info.

                    const salt = bcrypt.genSaltSync(10);
                    const secPass = bcrypt.hashSync(req.body.password, salt);

                    const user = await User.create({            // The .create() method calls the .save() method of mongoose to save the user as a new document into databasse.
                        name: req.body.name,
                        email: req.body.email,
                        password: secPass
                    });
                    res.send(user);                 // A response for new user registration is sent.
                }








            } catch (error) {
                res.status(500).send("Some Error Occured\n" + error);
                console.error(error.message)
            }
        }

        else {
            res.send({ errors: result.array() });
        }
    }
)

module.exports = router