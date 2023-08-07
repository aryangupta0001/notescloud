import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Alert = () => {
    const context = useContext(noteContext);
    const { alert } = context;
    console.log(alert);
    return (
        alert && <div className={`alert alert-success alert-dismissible fade show`} role="alert">
            Note has been <strong>{alert.operation}</strong>
        </div>
    )
}

export default Alert