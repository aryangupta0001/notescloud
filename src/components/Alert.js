// import React from 'react'

// export default function Alert(props) {
//     return (
//         props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
//             <strong>{props.alert.head}</strong> {props.alert.body}
//         </div>
//     )
// }


import React from 'react'

const Alert = (props) => {
    return (
        props.alert && <div className={`alert alert-dismissible fade show`} role="alert">
            <strong>{props.showAlert.title}</strong>
        </div>
    )
}

export default Alert