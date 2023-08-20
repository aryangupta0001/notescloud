import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote, showAlert } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        showAlert("Added")
    }

    return (
        <div>
            <div className="container my-5">
                <h2>Add a Note</h2>
                <form className="my-3" id='addNote'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <span style={{ color: "red" }}><b> *</b></span>
                        <span style={{ color: "red", display: note.title.length >= 5 && 'none' }}> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; [Min. 5 characters]</span>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} style={{ width: "50%" }} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <span style={{ color: "red" }}><b> *</b></span>
                        <span style={{ color: "red", display: note.description.length >= 5 && 'none' }}> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; [Min. 5 characters]</span>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} style={{ width: "50%" }} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} style={{ width: "50%" }} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleAdd} disabled={note.title.length < 5 || note.description.length < 5}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote