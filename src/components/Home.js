import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Home = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div>
      <h1>This is Home</h1>

      <h3>
        Hello
        {
          notes.map((element) => {
            // console.log(element.title);
            return element.title;

          })
        }
      </h3>
    </div>
  )
}

export default Home
