import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const Home = () => {
  const context=useContext(noteContext)
  const {notes, setNotes} = context;
  return (
    <div>
      <div className="conatiner my-3">
      <h2> Add a note</h2>
      <div className="mb-3">
        <label for="formGroupExampleInput" className="form-label">
          Add Title
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Add title of Your Note"
        />
      </div>
      <div className="mb-3">
        <label for="formGroupExampleInput2" className="form-label">
          Add Description
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Add details here"
        />
      </div>
      <div className="col-12">
    <button type="submit" className="btn">Submit</button>
  </div>
      </div>
      <div className="container my-3">
      <h4>Your notes</h4>
      {notes.map((note)=>{
        return note.title;
      })}
      </div>
    </div>
  );
};

export default Home;
