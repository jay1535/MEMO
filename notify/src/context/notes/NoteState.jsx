import React, { useState } from "react";
import noteContext from "./NoteContext";


const NoteState = (props) =>{
   const notesInitial=[
      {
        "_id": "677ff8e5096e88508c025d2c",
        "user": "6776b5fc88d524f453cf1543",
        "title": "My title",
        "description": "Description is here for yt",
        "tag": "You tube",
        "date": "2025-01-09T16:27:17.729Z",
        "__v": 0
      }
    ]
    const [notes, setNotes] = useState(notesInitial);
    
  return (
    <noteContext.Provider value={{notes,setNotes}}>
 {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;