import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;

    return (
        <>
            {
                notes.map((element) => (
                    <NoteItem note={element} key={element._id} />
                ))
            }
        </>
    )
}

export default Notes;