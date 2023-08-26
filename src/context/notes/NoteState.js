import { useState, useEffect } from "react"
import noteContext from "./noteContext"


const NoteState = (props) => {

    const HOST = "http://127.0.0.1:5000";

    let initialNotes = [];

    const [notes, setNotes] = useState(initialNotes);
    const [alertObj, setAlert] = useState(null);
    const [toggleLogin, setToggleLogin] = useState(true);
    const [user, setUser] = useState({});


    // CRUD Operations :-

    const fetchNotes = async () => {

        // Backend API Call :-

        try {
            const response = await fetch(`${HOST}/api/notes/fetchnote/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
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
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description, tag })
            });

            showAlert({ type: "Note", operation: "Added" });

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
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description, tag })
            });

            showAlert({ type: "Note", operation: "Updated" });

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
                    "auth-token": localStorage.getItem("token")
                }
            });

            showAlert({ type: "Note", operation: "Deleted" });

        } catch (error) {
            console.log(error);
        }

        // Frontend :-
        fetchNotes();
    }


    const showAlert = (alertObj) => {
        setAlert(alertObj)

        setTimeout(() => {
            setAlert(null);
        }, 750);
    }



    // User Login & Authentication :-

    const userLogin = async (email, password) => {

        const response = await fetch(`${HOST}/api/auth/login`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ email, password })
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            // await userAuth();
        }
        else {
            alert("Invalid Credentials")
        }
        console.log(json);

    }


    const userAuth = async () => {
        try {
            const response = await fetch(`${HOST}/api/auth/userauth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            });

            const json = await response.json();

            localStorage.setItem("name", json.name);
            localStorage.setItem("email", json.email);
            setUser({ name: json.name, email: json.email });

        } catch (error) {
            console.log("Error verifying user", error);
        }
    }


    const changePass = async (password, newpassword) => {
        console.log("ChangePass invoked");

        const response = await fetch(`${HOST}/api/auth/changepass`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ email: localStorage.getItem("email"), password, newpassword })
        });

        const json = await response.json();

        console.log(json);


    }


    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes, showAlert, setAlert, alertObj, userLogin, toggleLogin, setToggleLogin, userAuth, user, changePass }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;