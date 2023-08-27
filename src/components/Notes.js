import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext'
import { useNavigate } from "react-router-dom";




const Notes = () => {
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

    const context = useContext(noteContext);
    const { notes, fetchNotes, editNote } = context;

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchNotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])


    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (current_note) => {
        ref.current.click();
        setNote({ id: current_note._id, title: current_note.title, description: current_note.description, tag: current_note.tag });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleUpdate = () => {
        refClose.current.click();
        editNote(note.id, note.title, note.description, note.tag);
    }

    const handleAddHover = () => {
        const circle = document.getElementById("addLogo").children[0];
        const plus = document.getElementById("addLogo").children[1];

        circle.setAttribute("fill", "rgb(13, 110, 253)");
        plus.setAttribute("fill", "#ffffff");
    }

    const handleAddLeave = () => {
        const circle = document.getElementById("addLogo").querySelector("circle");
        const plus = document.getElementById("addLogo").children[1];

        circle.setAttribute("fill", "#00000000");
        plus.setAttribute("fill", "rgb(13, 110, 253)");
    };


    useEffect(() => {
        const index = notes.length;

        if (index > 0) {
            const notes = document.getElementById("notes");
            const lastNote = notes.children[index - 1].firstElementChild;
            const height = lastNote.offsetHeight;

            const lastEle = notes.children[index].firstElementChild;

            lastEle.style.maxHeight = height + "px";

            const addNoteButton = document.getElementById("addNoteButton");

            addNoteButton.style.maxHeight = height + "px";

            addNoteButton.children[0].style.height = 0.8 * height + "px";
        }
    }, [notes]);


    return (
        <>
            <div className="container">

                <AddNote />

                <button ref={ref} type="button" className="btn d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                </button>


                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>


                            <div className="modal-body">
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" name='title' onChange={onChange} value={note.title} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="desc" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="descripiton" name='description' onChange={onChange} value={note.description} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
                                    </div>
                                </form>
                            </div>


                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row my-3" id='notes'>
                    {
                        notes.map((note) => (
                            <NoteItem current_note={note} key={note._id} updateNote={updateNote} />
                        ))

                    }


                    <div className='col-md-3 '>
                        <div className='card my-3 p-3'>
                            <div className='addNoteButton d-inline d-flex justify-content-center align-items-center' id='addNoteButton' >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle pointer" viewBox="0 0 16 16" id="addLogo" onMouseOver={handleAddHover} onMouseLeave={handleAddLeave}
                                >
                                    <circle id='circle' cx="8" cy="8" r="8" fill="#00000000" />
                                    <path d="M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" fill="rgb(13, 110, 253)" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>


            </div >
        </>
    )
}

export default Notes;