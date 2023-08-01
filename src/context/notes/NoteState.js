import { useState } from "react"
import noteContext from "./noteContext"

const NoteState = (props) => {

    const HOST = "http://localhost:5000";

    let initialNotes = [];

    initialNotes = [
        {
            "_id": "64bc1b30a2b9870c634e4874",
            "title": "2nd",
            "description": "Update",
            "tags": "Final",
            "user": "64b8efba14ec83cb47226c21",
            "date": "2023-07-22T18:08:48.384Z",
            "__v": 0
        },
        {
            "_id": "64bc1b3ea2b9870c634e4876",
            "title": "3rd updated with new method",
            "description": "Updated",
            "tags": "Priority",
            "user": "64b8efba14ec83cb47226c21",
            "date": "2023-07-22T18:09:02.786Z",
            "__v": 0
        },
        {
            "_id": "64c3dcef78268980b0d6b39a",
            "title": "Hello",
            "description": "This is 4th note",
            "tags": "general",
            "user": "64b8efba14ec83cb47226c21",
            "date": "2023-07-28T15:21:19.925Z",
            "__v": 0
        },
        {
            "_id": "64c3dcf078268980b0d6b39c",
            "title": "Hello",
            "description": "This is 4th note",
            "tags": "general",
            "user": "64b8efba14ec83cb47226c21",
            "date": "2023-07-28T15:21:20.673Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(initialNotes);


    // CRUD Operations :-

    const addNote = async (title, description, tag) => {

        // Backend API Call :-

        const response = await fetch(`${HOST}/api/notes/createnote${id}`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjhlZmJhMTRlYzgzY2I0NzIyNmMyMSIsImlhdCI6MTY4OTk2NTcyOX0.JHHUjzM51gvVA2kxwnvd309pR7Gmetn7xxnYHxH1Qw4"
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json = response.json();


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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjhlZmJhMTRlYzgzY2I0NzIyNmMyMSIsImlhdCI6MTY4OTk2NTcyOX0.JHHUjzM51gvVA2kxwnvd309pR7Gmetn7xxnYHxH1Qw4"
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json = response.json();


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
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;