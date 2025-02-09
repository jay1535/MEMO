import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote} = context;

  useEffect(() => {
    getNotes();
  }, []);
  const ref = useRef(null);
  const refClose= useRef(null);
  const [note, setNote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "defult",
  });

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag});
    
  };

  const handleClick = (e) => {
    console.log("Updating the note", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Notes updated successfully🎉","success")
    
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <div className="row p-3 my-3">
        <h4>Your notes📖..</h4>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert}note={note} />
          );
        })}
      </div>

      {/* Update Notes*/}

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Notes
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-8 text-primary" id="exampleModalLabel">
                Edit Your Notes
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                 Edit Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  value={note.etitle}
                  placeholder=""
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Edit Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  value={note.edescription}
                  placeholder=""
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                 Edit Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  value={note.etag}
                  placeholder=""
                  onChange={onChange}
                />
              </div>
            
            </div>


            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary"  onClick={handleClick}>
                Update                                            
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
