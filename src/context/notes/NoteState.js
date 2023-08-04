import { useState } from "react"
import noteContext from "./noteContext"

const NoteState = (props) => {

    const HOST = "http://127.0.0.1:5000";

    let initialNotes = [];

    initialNotes = []

    const [notes, setNotes] = useState(initialNotes);


    // CRUD Operations :-

    const fetchNotes = async () => {

        // Backend API Call :-

        try {
            const response = await fetch(`${HOST}/api/notes/fetchnote/`, {

                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2QxOGNjYmZkNGUyYzJlMGZiN2VjNyIsImlhdCI6MTY5MTE2OTQ5MX0.95c5Twcm4FudjjQzRHrVKJ88gmhGtedctHb8OB5fbKs"
                }
            });

            const json = await response.json();

            console.log(json);
            setNotes(json);
        }
        catch (error) { 
            console.log("Error fetching notes:", error.message);
        }
    }

    const addNote = async (title, description, tag) => {

        // Backend API Call :-

        const response = await fetch(`${HOST}/api/notes/createnote`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjhlZmJhMTRlYzgzY2I0NzIyNmMyMSIsImlhdCI6MTY4OTk2NTcyOX0.JHHUjzM51gvVA2kxwnvd309pR7Gmetn7xxnYHx  H1Qw4"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);



        // Frontend :-

        const note = {
            "_id": "64c3dcf078268980b0d6b39",
            "title": title,
            "description": description,
            "tags": tag,
            "user": "64b8efba14ec83cb47226c21",
            "date": "2023-07-28T15:21:20.673Z",
            "__v": 0
        }

        setNotes(notes.concat(note))
    }

    const editNote = async (id, title, descripiton, tag) => {

        // Backend API Call :-

        const response = await fetch(`${HOST}/api/notes/updatenote/${id}`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2QxOGNjYmZkNGUyYzJlMGZiN2VjNyIsImlhdCI6MTY5MTE2OTQ5MX0.95c5Twcm4FudjjQzRHrVKJ88gmhGtedctHb8OB5fbKs"
            },
            body: JSON.stringify({ title, descripiton, tag })
        });
        const json = await response.json();
        console.log(json);



        // Frontend :-

        for (let i = 0; i < notes.length; i++) {
            if (notes[i]._id === id) {
                notes[i].title = title;
                notes[i].description = descripiton;
                notes[i].tags = tag;

            }
        }
    }

    const deleteNote = (id) => {
        setNotes(notes.filter((note) => { return note._id !== id }))
    }






    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;