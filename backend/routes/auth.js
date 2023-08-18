const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchUser = require("../middleware/fetchUser")

const JWT_TOKEN = "ItsAryan";

router.get("/", (req, res) => {
    obj = {
        a: "Authentication"
    }

    res.json(obj)
})


// Endpoint --> Endpoint to CREATE NEW USER by sending data through POST request.

router.post("/createuser",
    [
        body("name", "Enter a valid name").isLength({ min: 5 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password should be min. 5 characters long").isLength({ min: 5 })

        // In above validations, the second parameter is optional, it is sent to the client when any error occurs (i.e validation fails)    
    ],

    async (req, res) => {
        // To validate the results according to the model defined.
        const result = validationResult(req);
        let success = false;

        if (result.isEmpty()) {         // checks whether the resullt object is empty or not, if it is empty,  it means there are no validation errors & all values are valid.

            try {
                const user = await User.findOne({ email: req.body.email });         // It finds for the  document with same e-mail idd that is provided in current request.

                if (user) {             // If any doocument with current e-mail id is available in collection, it means it is duplicate.
                    console.log({ success, error: "A user with this email already exists" });
                    return res.status(400).json({ success, error: "A user with this email already exists" });
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

                    const userData = {                          // This object containes the PAYLOAD of the JSON WEB TOKEN
                        userId: {
                            id: user.id
                        }
                    }
                    const jwtToken = jwt.sign({ id: user.id }, JWT_TOKEN);              // We can also pass the above object as 1st argument into this method.

                    success = true;

                    res.send({ success, user });                 // A response for new user registration is sent. We can also send the  above generated JWT Token instead of user deetails here.
                }

            } catch (error) {
                console.error(success, error.message)
                res.status(500).send(success, error.message);
            }
        }

        else {
            // console.log({ success, error: "User Already exists" });
            res.send({ success, error: "User Already exists", result });
        }
    }
)


// Endpoint --> Endpoint to Obtain JWT TOKEN by sending data through POST request.

router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()

    // In above validations, the second parameter is optional, it is sent to the client when any error occurs (i.e validation fails)    
],
    async (req, res) => {
        const result = validationResult(req);

        let success = false;

        if (result.isEmpty()) {
            const { email, password } = req.body;

            try {
                const user = await User.findOne({ email: email })
                if (user) {
                    let passMatch = await bcrypt.compare(password, user.password)

                    if (passMatch) {
                        const jwtToken = jwt.sign({ id: user.id }, JWT_TOKEN);
                        success = true;
                        res.json({ success, jwtToken });
                    }
                    else {
                        return res.status(400).json({ success, error: "Invalid credentials" });
                    }
                }

                else {
                    return res.status(400).json({ success, error: "Invalid credentials" });
                }
            } catch (error) {
                res.status(500).send({ success, error });
                console.error(success, error.message);
            }
        }

        else {
            res.status(400).send({ success, errors: result.array() });
            console.log(success, result.array());
        }

    }
)


// Endpoint --> Endpoint to Authenticate User thorugh JWT Token by sending data through POST request.

router.post("/userauth", fetchUser, async (req, res) => {

    let success = false;

    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");                   // "--password" argument in .select() method is used to exclude password while selecting the user details.
        res.send(user);
    }
    catch (error) {
        console.error(success, error.message)
        res.status(500).send({ success, error });
    }
})

module.exports = router