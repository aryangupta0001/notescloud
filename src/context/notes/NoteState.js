import noteContext from "./noteContext"

const NoteState = (props) => {
    const state = {
        "name": "Aryan",
        "age": 21
    }

    return (
        <noteContext.Provider value={state}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;