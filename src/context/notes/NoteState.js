// import { useState } from "react"
// import noteContext from "./noteContext"

// const NoteState = (props) => {

//     const HOST = "http://localhost:5500";

//     let initialNotes = [];

//     initialNotes = []

//     const [notes, setNotes] = useState(initialNotes);


//     // CRUD Operations :-

//     const fetchNotes = async () => {

//         // Backend API Call :-

//         const response = await fetch(`${HOST}/api/notes/fetchnote/`, {

//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjhlZmJhMTRlYzgzY2I0NzIyNmMyMSIsImlhdCI6MTY4OTk2NTcyOX0.JHHUjzM51gvVA2kxwnvd309pR7Gmetn7xxnYHxH1Qw4"
//             }
//         });

//         const json = await response.json();

//         console.log(json);
//     }

//     const addNote = async (title, description, tag) => {

//         // Backend API Call :-

//         const response = await fetch(`${HOST}/api/notes/createnote`, {

//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjhlZmJhMTRlYzgzY2I0NzIyNmMyMSIsImlhdCI6MTY4OTk2NTcyOX0.JHHUjzM51gvVA2kxwnvd309pR7Gmetn7xxnYHx  H1Qw4"
//             },
//             body: JSON.stringify({ title, description, tag })
//         });
//         const json = await response.json();
//         console.log(json);



//         // Frontend :-

//         const note = {
//             "_id": "64c3dcf078268980b0d6b39",
//             "title": title,
//             "description": description,
//             "tags": tag,
//             "user": "64b8efba14ec83cb47226c21",
//             "date": "2023-07-28T15:21:20.673Z",
//             "__v": 0
//         }

//         setNotes(notes.concat(note))
//     }

//     const editNote = async (id, title, descripiton, tag) => {

//         // Backend API Call :-

//         const response = await fetch(`${HOST}/api/notes/updatenote/${id}`, {

//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjhlZmJhMTRlYzgzY2I0NzIyNmMyMSIsImlhdCI6MTY4OTk2NTcyOX0.JHHUjzM51gvVA2kxwnvd309pR7Gmetn7xxnYHxH1Qw4"
//             },
//             body: JSON.stringify({ title, descripiton, tag })
//         });
//         const json = await response.json();
//         console.log(json);



//         // Frontend :-

//         for (let i = 0; i < notes.length; i++) {
//             if (notes[i]._id === id) {
//                 notes[i].title = title;
//                 notes[i].description = descripiton;
//                 notes[i].tags = tag;

//             }
//         }
//     }

//     const deleteNote = (id) => {
//         setNotes(notes.filter((note) => { return note._id !== id }))
//     }






//     return (
//         <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes }}>
//             {props.children}
//         </noteContext.Provider>
//     )
// }

// export default NoteState;


import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:5500"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
            }
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }
    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
            },
            body: JSON.stringify({ title, description, tag })
        });


        console.log("Adding a new note")
        const note = {
            "_id": "61322f119553781a8ca8d0e08",
            "user": "6131dc5e3e4037cd4734a0664",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-03T14:20:09.668Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = (id) => {
        // TODO: API Call
        console.log("Deleting the note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;
