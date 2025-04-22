import { useState } from "react"
import noteContext from "./noteContext"


const NoteState = (props) => {

    const HOST = "http://localhost:5000";

    let initialNotes = [];

    const [notes, setNotes] = useState(initialNotes);
    const [alertObj, setAlert] = useState(null);
    const [toggleLogin, setToggleLogin] = useState(true);
    const [user, setUser] = useState({});
    const [totalNotes, setTotalNotes] = useState(0);


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

            setTotalNotes(Object.keys(json).length);
            setNotes(json);
        }
        catch (error) {
            alert("Some eerror occured \n Check console for more info.")
            console.log("Error fetching notes: \n", error);
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
            alert("Some error occured \n Check console for more info.")
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

            alert("Some eerror occured \n Check console for more info.")
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
            alert("Some eerror occured \n Check console for more info.")
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
            alert(json.error);
        }


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
            alert("Some eerror occured \n Check console fcor more info.")
            console.log("Error verifying user", error);
        }
    }


    const changePass = async (password, newpassword) => {
        try {
            const response = await fetch(`${HOST}/api/auth/changepass`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ email: localStorage.getItem("email"), password, newpassword })
            });

            const json = await response.json();

            if (json.success) {
                showAlert({ type: "User", operation: "Passsword Changed" });

            }
            else {
                alert(json.error);
            }

        }
        catch (error) {
            alert(error.message);
        }

    }


    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, fetchNotes, showAlert, setAlert, alertObj, userLogin, toggleLogin, setToggleLogin, userAuth, user, changePass, totalNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;