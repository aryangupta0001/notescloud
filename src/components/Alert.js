import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Alert = () => {
    const context = useContext(noteContext);
    const { alert } = context;
    return (
        alert && <div className=" alert alert-primary alert-dismissible fade show mb-0 sticky-top" role="alert">
            Note has been <strong>{alert.operation}</strong>
        </div>
    )
}

export default Alert