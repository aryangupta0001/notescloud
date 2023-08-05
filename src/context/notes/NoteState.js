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
            setNotes(json);
        }
        catch (error) {
            console.log("Error fetching notes:", error.message);
        }
    }

    const addNote = async (title, description, tag) => {

        // Backend API Call :-

        await fetch(`${HOST}/api/notes/createnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2QxOGNjYmZkNGUyYzJlMGZiN2VjNyIsImlhdCI6MTY5MTE2OTQ5MX0.95c5Twcm4FudjjQzRHrVKJ88gmhGtedctHb8OB5fbKs"
            },
            body: JSON.stringify({ title, description, tag })
        });

        // Frontend :-

        fetchNotes();

    }

    const editNote = async (id, title, descripiton, tag) => {

        // Backend API Call :-

        const response = await fetch(`${HOST}/api/notes/updatenote/${id}`, {

            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2QxOGNjYmZkNGUyYzJlMGZiN2VjNyIsImlhdCI6MTY5MTE2OTQ5MX0.95c5Twcm4FudjjQzRHrVKJ88gmhGtedctHb8OB5fbKs"
            },
            body: JSON.stringify({ title, descripiton, tag })
        });
        const json = await response.json();
        console.log(json);



        // Frontend :-

        fetchNotes();
    }

    const deleteNote = async (id) => {

        // Backend API call :-

        await fetch(`${HOST}/api/notes/deletenote/${id}`, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2QxOGNjYmZkNGUyYzJlMGZiN2VjNyIsImlhdCI6MTY5MTE2OTQ5MX0.95c5Twcm4FudjjQzRHrVKJ88gmhGtedctHb8OB5fbKs"
            }
        });

        // Updating Notes on Frontend :-
        fetchNotes();
    }

    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;