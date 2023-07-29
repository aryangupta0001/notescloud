import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;

    return (
        <>
            <div className="row my-3">
                {
                    notes.map((element) => (
                        <NoteItem note={element} key={element._id} />
                    ))
                }
            </div>
        </>
    )
}

export default Notes;