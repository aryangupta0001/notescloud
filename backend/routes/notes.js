const express = require("express");
const router = express.Router();
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');
const fetchUser = require("../middleware/fetchUser")


router.get("/", (req, res) => {
    obj = {
        a: "Notescloud.com"
    }

    res.json(obj)
})


// Endpoint 1 --> Endpoint to Create Note of a user by sending data through POST request.

router.post("/createnote", fetchUser,
    [
        body("title", "Enter a valid title").isLength({ min: 5 })
        // In above validations, the second parameter is optional, it is sent to the client when any error occurs (i.e validation fails)    
    ],


    async (req, res) => {
        // To validate the results according to the model defined.
        const result = validationResult(req);

        if (result.isEmpty()) {         // checks whether the resullt object is empty or not, if it is empty,  it means there are no validation errors & all values are valid.

            try {
                const { title, description, tag } = req.body;
                const note = await Note.create({            // The .create() method calls the .save() method of mongoose to save the user as a new document into databasse.
                    title, description, tag, user: req.id
                });
                res.send(note);                 // A response for new user registration is sent. We can also send the  above generated JWT Token instead of user deetails here.
            }
            catch (error) {
                res.status(500).send("Some Error Occured");
                console.error(error.message)
            }
        }
        else {
            res.send({ errors: result.array() });
        }
    }
)

// Endpoint 2 --> Endpoint to Fech All Notes of a user by fetching data through GET request.

router.get("/fetchnote", fetchUser, async (req, res) => {

    try {
        const note = await Note.find({ user: req.id });
        res.send(note);
    }
    catch (error) {
        // res.status(500).send("Some Error Occured");
        console.log(error.message)
    }
}
)


// Endpoint 3 --> Endpoint to update a note thorough PUT request.

router.put("/updatenote/:id", fetchUser, async (req, res) => {

    const newNote = {};
    if (req.body.title) {
        newNote.title = req.body.title;
    }

    if (req.body.description) {
        newNote.description = req.body.description;
    }

    if (req.body.tag) {
        newNote.tag = req.body.tag;
    }



    // Method 1 -->
    let noteExists = await Note.findById(req.params.id);

    if (noteExists) {
        if (noteExists.user === req.id) {
            Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
                .then(
                    res.send(newNote)
                );

        }
        else {
            console.log("You do NOT have access to this note");
            res.status(401).send("You do NOT have access to this note");
        }
    }
    else {
        console.log("Note NOT found");
        res.status(404).send("Note NOT found");
    }



    /*
    
    // Method 2 --> 
    if (note.length > 0) {
        let found = false
        
        try {
            note.forEach(element => {
                if (found) {
                    throw new Error("BreakError");
                }

                if (element._id.toString().split("\"")[0] === req.params.id.toString()) {
                    found = true;
                }
            });
            res.send("Note not found");
        } catch (error) {
            if (error.message === "BreakError") {
                
                Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
                .then(
                    res.send(newNote)
                    );
                }
                else {
                    console.log(error)
                }
            }
        }
        else {
            res.send("User does not have any note");
        }

    */
})


// Endpoint 4 --> Endpoint to delete a note thorough DELETE request.

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {
        let noteExists = await Note.findById(req.params.id);

        if (noteExists) {
            if (noteExists.user === req.id) {

                Note.findByIdAndDelete(req.params.id)
                    .then(
                        res.send("Node Deleted")
                    );

            }
            else {
                res.status(401).send("You do NOT have access to this note");
            }
        }
        else {
            res.status(404).send("Note NOT found");
        }

    }

    catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports = router