import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


const NoteItem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;


    const { note } = props;
    return (
        <div className='col-md-3'>

            <div className="card my-3" style={{ "width": "18rem" }}>
                <div className="card-body">
                    <div className='d-flex'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-sharp fa-solid fa-pencil mx-3" style={{ color: "#0000ff", cursor: "pointer" }}></i>
                        <i className="fa-sharp fa-regular fa-trash-can mx-3" style={{ "color": "#ff0000", cursor: "pointer" }} onClick={() => { deleteNote(note._id) }}></i>
                    </div>

                    <p className="card-text">{note.description}</p>
                    <p className="card-text">#{note.tags}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem