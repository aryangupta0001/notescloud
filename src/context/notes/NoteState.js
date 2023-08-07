import { useState } from "react"
import noteContext from "./noteContext"

const NoteState = (props) => {

    const HOST = "http://127.0.0.1:5000";

    let initialNotes = [];

    const [notes, setNotes] = useState(initialNotes);
    const [alert, setAlert] = useState(null);



    // CRUD Operations :-

    const fetchNotes = async () => {

        // Backend API Call :-

        try {
            const response = await fetch(`${HOST}/api/notes/fetchnote/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2U3MjBlYjc5ZDk0NWE1Y2M4YTkyZiIsImlhdCI6MTY5MTM0NDM3NH0.xBeCwEMgJDHpEIywH59pnJLP_i8CWs7PA9XBRWTNIo8"
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

        try {
            await fetch(`${HOST}/api/notes/createnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2U3MjBlYjc5ZDk0NWE1Y2M4YTkyZiIsImlhdCI6MTY5MTM0NDM3NH0.xBeCwEMgJDHpEIywH59pnJLP_i8CWs7PA9XBRWTNIo8"
                },
                body: JSON.stringify({ title, description, tag })
            });

            showAlert("Added");

        } catch (error) {
            console.log(error);
        }

        // Frontend :-
        fetchNotes();

    }

    const editNote = async (id, title, description, tag) => {

        // Backend API Call :-

        try {
            await fetch(`${HOST}/api/notes/updatenote/${id}`, {

                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2U3MjBlYjc5ZDk0NWE1Y2M4YTkyZiIsImlhdCI6MTY5MTM0NDM3NH0.xBeCwEMgJDHpEIywH59pnJLP_i8CWs7PA9XBRWTNIo8"
                },
                body: JSON.stringify({ title, description, tag })
            });

            showAlert("Updated");

        } catch (error) {
            console.log(error);
        }

        // Frontend :-
        fetchNotes();
    }

    const deleteNote = async (id) => {

        // Backend API call :-

        try {
            await fetch(`${HOST}/api/notes/deletenote/${id}`, {

                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2U3MjBlYjc5ZDk0NWE1Y2M4YTkyZiIsImlhdCI6MTY5MTM0NDM3NH0.xBeCwEMgJDHpEIywH59pnJLP_i8CWs7PA9XBRWTNIo8"
                }
            });

            showAlert("Deleted");

        } catch (error) {
            console.log(error);
        }

        // Frontend :-
        fetchNotes();
    }


    const showAlert = (operation) => {
        setAlert({
            operation: operation
        })

        setTimeout(() => {
            setAlert(null);
        }, 750);
    }

    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes, showAlert, alert }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;