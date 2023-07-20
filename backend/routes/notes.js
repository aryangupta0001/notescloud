const express = require("express");
const router = express.Router();
const Note = require("../models/Note")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchUser = require("../middleware/fetchUser")


router.get("/", (req, res) => {
    obj = {
        a: "Notescloud.com"
    }

    res.json(obj)
})


// Endpoint --> Endpoint to CREATE NEW USER by sending data through POST request.

router.post("/createnote", fetchUser
    [
        body("title", "Enter a valid title").isLength({ min: 5 })
        // In above validations, the second parameter is optional, it is sent to the client when any error occurs (i.e validation fails)    
    ],

    async (req, res) => {
        // To validate the results according to the model defined.
        const result = validationResult(req);

        if (result.isEmpty()) {         // checks whether the resullt object is empty or not, if it is empty,  it means there are no validation errors & all values are valid.

            try {
                const {title, description, tag} = req.body ;

                const user = await User.create({            // The .create() method calls the .save() method of mongoose to save the user as a new document into databasse.
                    title, description, tag, 
                });

                const userData = {                          // This object containes the PAYLOAD of the JSON WEB TOKEN
                    userId: {
                        id: user.id
                    }
                }
                const jwtToken = jwt.sign({ id: user.id }, JWT_TOKEN);              // We can also pass the above object as 1st argument into this method.

                res.send(user);                 // A response for new user registration is sent. We can also send the  above generated JWT Token instead of user deetails here.
            }

            } catch (error) {
            res.status(500).send("Some Error Occured");
            console.error(error.message)
        }
    }

        else {
        res.send({ errors: result.array() });
    }
    }
)




module.exports = router 