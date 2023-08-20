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


    const ref = useRef(null)
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


                <div className="row my-3">
                    {
                        notes.map((note) => (
                            <NoteItem current_note={note} key={note._id} updateNote={updateNote} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Notes;