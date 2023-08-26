import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


const NoteItem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { current_note, updateNote } = props;

    return (
        <>
            <div className='col-md-3'>

                <div className="card my-3 w-100">
                    <div className="card-body">
                        <div className='d-flex'>
                            <h5 className="card-title">{current_note.title}</h5>
                            <i className="fa-sharp fa-solid fa-pencil mx-3" style={{ color: "#0000ff", cursor: "pointer" }} onClick={() => { updateNote(current_note) }}></i>
                            <i className="fa-sharp fa-regular fa-trash-can mx-3" style={{ "color": "#ff0000", cursor: "pointer" }} onClick={() => { deleteNote(current_note._id) }}></i>
                        </div>

                        <p className="card-text">{current_note.description}</p>
                        <p className="card-text">{current_note.tag.length > 0 && "#" + current_note.tag}</p>
                    </div>
                </div>

            </div >
        </>
    )
}

export default NoteItem