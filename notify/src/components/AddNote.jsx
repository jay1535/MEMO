import React, { useContext, useState} from "react";

import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
 

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Notes added Successfully!!🎉","success")
    setNote({
      title: "",
      description: "",
      tag: ""
    })
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };
  return (
    <div className="conatiner my-3 p-3">
      <h2> Add a note</h2>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Add Title
        </label>
        <input
          type="text"
          value={note.title}
          className="form-control"
          id="title"
          placeholder="Add title.."
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput2" className="form-label">
          Add Description
        </label>
        <input
          type="text"
          value={note.description}
          className="form-control"
          id="description"
          placeholder="Add description.."
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput2" className="form-label">
          Add a Tag
        </label>
        <input
          type="text"
          value={note.tag}
          className="form-control"
          id="tag"
          placeholder=""
          onChange={onChange}
          required
        />
      </div>
      <div className="col-12">
        <button type="submit" className="btn mx-5" onClick={handleClick}>
          Add Note
        </button>

        
      </div>
    </div>
  );
};

export default AddNote;
