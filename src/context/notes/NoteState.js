import { useState } from "react"
import noteContext from "./noteContext"

const NoteState = (props) => {

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


    const addNote = (title, description, tag) => {
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

    const editNote = (id) => {

    }
    const deleteNote = (id) => {
        // const newNotes = notes.filter((note) => { return note._id !== id })
        // setNotes(newNotes)
        setNotes(notes.filter((note) => { return note._id !== id }))
    }




    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;