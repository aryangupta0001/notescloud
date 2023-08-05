import React, { useContext, useEffect } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

import noteContext from '../context/notes/noteContext'


const Notes = () => {
    const context = useContext(noteContext);
    const { notes, fetchNotes } = context;

    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <AddNote />
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