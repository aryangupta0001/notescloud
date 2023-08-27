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

    useEffect(() => {
        const index = notes.length;

        if (index > 0) {
            const target = document.getElementById("notes");
            const lastNote = target.children[index - 1].firstElementChild;
            const height = lastNote.offsetHeight;

            const lastEle = target.children[index].firstElementChild;

            lastEle.style.maxHeight = height + "px";

            document.getElementById("addLogo").style.maxHeight = height + "px";
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


                    <div className='col-md-3'>
                        <div className='card my-3'>
                            <div className=' d-inline d-flex justify-content-center align-items-center' id='addNoteButton' style={{ maxHeight: "100%" }}>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                    </svg> */}

                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16" id='addLogo'>
                                    <circle cx="8" cy="8" r="8" fill="currentColor" style={{ maxHeight: "90%" }} />
                                    <path d="M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" fill="red" style={{ maxHeight: "90%" }} />
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