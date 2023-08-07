import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote, showAlert } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "primary" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("Added")
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <input type="text" className="form-control" id="descripiton" name='description' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleAdd}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
