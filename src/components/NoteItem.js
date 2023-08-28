import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


const NoteItem = (props) => {

    const context = useContext(noteContext);
    const { addNote, showAlert, deleteNote, editNote } = context;
    const { current_note } = props;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [toggleEdit, setToggleEdit] = useState(false);

    let tags = ["general", "priority", "important", "urgent", "asap", "free"];

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        showAlert("Added")
    }

    const handleEditNote = () => {
        setToggleEdit(true);
        setNote({ id: current_note._id, title: current_note.title, description: current_note.description, tag: current_note.tag });
    }

    const updateNote = () => {
        setToggleEdit(false);
        editNote(note.id, note.title, note.description, note.tag);
    }


    return (
        (current_note._id !== "newNote")
            ?
            <>
                <div className='col-md-3'>

                    <div className={`${toggleEdit ? "d-none" : "d-block"}`}>
                        <div className="card my-3 w-100">
                            <div className="card-body">
                                <div className='float-end'>
                                    {/* <i className="fa-sharp fa-solid fa-pencil mx-3 pointer" style={{ color: "#0000ff", fontSize: "1.2em" }} onClick={() => { updateNote(current_note) }}></i> */}

                                    <i className="fa-sharp fa-solid fa-pencil mx-3 pointer" style={{ color: "#0000ff", fontSize: "1.2em" }} onClick={handleEditNote}></i>
                                    <i className="fa-sharp fa-regular fa-trash-can mx-3 pointer" style={{ "color": "#ff0000", fontSize: "1.25em" }} onClick={() => { deleteNote(current_note._id) }}></i>
                                </div>
        
                                <h3 className="card-title">{current_note.title}</h3>

                                <p className="card-text">{current_note.description}</p>
                                <p className="card-text">{current_note.tag.length > 0 && "#" + current_note.tag}</p>
                            </div>
                        </div>
                    </div >

                    <div className={`${toggleEdit ? "d-block" : "d-none"}`}>
                        <div className="card my-3 w-100">
                            <div className="card-body">
                                <div className='float-end'>
                                    <i className="fa-sharp fa-solid fa-check pointer" style={{ color: "#32ff24", fontSize: "1.35em" }} onClick={updateNote}></i>
                                    <i className="fa-sharp fa-solid fa-xmark mx-3 pointer" style={{ "color": "#ff0000", fontSize: "1.3em" }} onClick={() => { setToggleEdit(false) }}></i>
                                </div>

                                <h4>
                                    <input type="text" name="title" id="title" className='newNoteEle' placeholder='Title' autoFocus value={note.title} onChange={onChange} />
                                </h4>
                                <textarea name="description" id="description" cols="30" rows="2" className='newNoteEle' placeholder='Description' value={note.description} onChange={onChange} />
                                <input type="text" className="newNoteEle" id="tag" name='tag' list="options" placeholder='Tag' value={note.tag} onChange={onChange} />

                            </div>
                        </div>
                    </div >
                </div >
            </>
            :
            <>
                <div className='col-md-3'>
                    <div className="card my-3 w-100">
                        <div className="card-body">
                            <div className='float-end'>
                                <i className="fa-sharp fa-solid fa-check pointer" style={{ color: "#32ff24", fontSize: "1.35em" }} onClick={handleAdd}></i>
                                <i className="fa-sharp fa-regular fa-trash-can mx-3 pointer" style={{ "color": "#ff0000", fontSize: "1.25em" }} onClick={() => { deleteNote(current_note._id) }}></i>
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


            </>

    )
}

export default NoteItem