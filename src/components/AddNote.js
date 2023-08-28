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

    let tags = ["general", "priority", "important", "urgent", "asap", "free"];


    return (
        <div>
            <div className="container my-5">
                <h2>Add a Note</h2>
                <form className="my-3" id='addNote'>
                    <div className="mb-3 w-50">
                        <div className='d-flex justify-content-between'>
                            <div>
                                <label htmlFor="title" className="form-label">Title</label>
                                <span style={{ color: "red" }}><b> *</b></span>
                            </div>
                            <span style={{ color: "red", display: note.title.length >= 5 && 'none' }}>[Min. 5 characters]</span>
                        </div>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} />
                    </div>

                    <div className="mb-3 w-50">
                        <div className='d-flex justify-content-between'>
                            <div>
                                <label htmlFor="description" className="form-label">Description</label>
                                <span style={{ color: "red" }}><b> *</b></span>
                            </div>
                            <span style={{ color: "red", display: note.description.length >= 5 && 'none' }}>[Min. 5 characters]</span>
                        </div>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                    </div>

                    <div className="mb-3 w-50">
                        <label htmlFor="tag" className="form-label">Tag</label>

                        {/* <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} /> */}

                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} list="options" />

                        <datalist id="options">
                            {tags.map((option, index) => (
                                <option key={index} value={option} />
                            ))}
                        </datalist>

                    </div>


                    <button type="submit" className="btn btn-primary" onClick={handleAdd} disabled={note.title.length < 5 || note.description.length < 5}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote