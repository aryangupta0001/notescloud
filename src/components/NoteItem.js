// import React, { useContext } from 'react'
// import noteContext from '../context/notes/noteContext'


// const NoteItem = (props) => {

//     const context = useContext(noteContext);
//     const { deleteNote } = context;
//     const { note, updateNote } = props;

//     return (
//         <div className='col-md-3'>

//             <div className="card my-3" style={{ "width": "18rem" }}>
//                 <div className="card-body">
//                     <div className='d-flex'>
//                         <h5 className="card-title">{note.title}</h5>
//                         <i className="fa-sharp fa-solid fa-pencil mx-3" style={{ color: "#0000ff", cursor: "pointer" }} onclick={() => { updateNote(note) }}></i>
//                         <i className="fa-sharp fa-regular fa-trash-can mx-3" style={{ "color": "#ff0000", cursor: "pointer" }} onClick={() => { deleteNote(note._id) }}></i>
//                     </div>

//                     <p className="card-text">{note.description}</p>
//                     <p className="card-text">#{note.tag}</p>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default NoteItem











import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem