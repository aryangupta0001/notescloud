import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote, showAlert, deleteNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        showAlert("Added");
    }

    let tags = ["general", "priority", "important", "urgent", "asap", "free"];





    return (


        // Uncomment for old view -->
        // <div>
        //     <div className="container my-5">
        //         <h2>Add a Note</h2>
        //         <form className="my-3" id='addNote'>
        //             <div className="mb-3 w-50">
        //                 <div className='d-flex justify-content-between'>
        //                     <div>
        //                         <label htmlFor="title" className="form-label">Title</label>
        //                         <span style={{ color: "red" }}><b> *</b></span>
        //                     </div>
        //                     <span style={{ color: "red", display: note.title.length >= 5 && 'none' }}>[Min. 5 characters]</span>
        //                 </div>
        //                 <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} />
        //             </div>

        //             <div className="mb-3 w-50">
        //                 <div className='d-flex justify-content-between'>
        //                     <div>
        //                         <label htmlFor="description" className="form-label">Description</label>
        //                         <span style={{ color: "red" }}><b> *</b></span>
        //                     </div>
        //                     <span style={{ color: "red", display: note.description.length >= 5 && 'none' }}>[Min. 5 characters]</span>
        //                 </div>
        //                 <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
        //             </div>

        //             <div className="mb-3 w-50">
        //                 <label htmlFor="tag" className="form-label">Tag</label>

        //                 {/* <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} /> */}

        //                 <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} list="options" />

        //                 <datalist id="options">
        //                     {tags.map((option, index) => (
        //                         <option key={index} value={option} />
        //                     ))}
        //                 </datalist>

        //             </div>


        //             <button type="submit" className="btn btn-primary" onClick={handleAdd} disabled={note.title.length < 5 || note.description.length < 5}>Add Note</button>
        //         </form>
        //     </div>
        // </div>







        <div className='col-md-3'>
            <div className="card my-3 w-100">
                <div className="card-body">
                    <div className='float-end'>
                        <i className="fa-sharp fa-solid fa-check pointer" style={{ color: "#32ff24", fontSize: "1.35em" }} onClick={handleAdd}></i>
                        {/* <i className="fa-sharp fa-regular fa-trash-can mx-3 pointer" style={{ "color": "#ff0000", fontSize: "1.25em" }} onClick={() => { deleteNote(current_note._id) }}></i> */}
                    </div>

                    <input type="text" name="title" id="title" className='newNoteEle' placeholder='Title' autoFocus value={note.title} onChange={onChange} />
                    <textarea name="description" id="description" cols="30" rows="2" className='newNoteEle' placeholder='Description' value={note.description} onChange={onChange} />
                    <input type="text" className="newNoteEle" id="tag" name='tag' list="options" placeholder='Tag' value={note.tag} onChange={onChange} />

                    <datalist id="options">
                        {tags.map((option, index) => (
                            <option key={index} value={option} />
                        ))}
                    </datalist>

                </div>
            </div>

        </div >
    )
}

export default AddNote