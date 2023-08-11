import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Alert = () => {
    const context = useContext(noteContext);
    const { alertObj } = context;
    // const type = alertObj.type;
    return (

        alertObj && (alertObj.type === "Note" ?
            <div className=" alert alert-primary alert-dismissible fade show mb-0 sticky-top" role="alert">
                Note has been <strong>{alertObj.operation}</strong></div>
            :
            <div className=" alert alert-primary alert-dismissible fade show mb-0 sticky-top" role="alert">
                User <strong>{alertObj.operation}</strong> successfull</div>)


        // alertObj && <div className=" alert alert-primary alert-dismissible fade show mb-0 sticky-top" role="alert"><strong>{alertObj}</strong> successfull</div>

    )
}

export default Alert