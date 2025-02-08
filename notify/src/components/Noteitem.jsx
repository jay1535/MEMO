import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const context=useContext(noteContext)
  const { deleteNote } = context;
  const { note, updateNote} = props;
  return (
    <div className="col-md-3 p-3 ">
      <div className="card  mb-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
         
          <p className="card-text">{note.description}
           
          </p>
          <i className="fa-solid fa-pen" onClick={()=>{
            {updateNote(note)}
          }}> </i>
          <i className="fa-solid fa-trash" onClick={()=>{
            deleteNote(note._id)
          }}></i>
          
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
