const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal error occured");
    }
});
//Route 2: Add  the notes

router.post(
    "/addnote",
    fetchuser,[
    (body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "description must be of atleast 5 characters").isLength(
            { min: 5 }
        ))
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some internal error occured");
        }
    }
);



//Route 3: Update an existing note

router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        try {
            
       
       const {title, description,tag} = req.body;
       
       const newNote = {}
       if(title){newNote.title = title};
       if(description){newNote.description = description};
       if(tag){newNote.tag = tag};


       // Find the note to be updated

       let note = await Notes.findById(req.params.id);
       if(!note){return res.status(404).send("Not found")}

       if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
       }

       note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})
       res.json({note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal error occured");
    }
    }

);

//Route 4 : Delete notes

router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
        try {
            
       
       const {title, description,tag} = req.body;

       // Find the note to be deleted

       let note = await Notes.findById(req.params.id);
       if(!note){return res.status(404).send("Not found")}

       if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
       }

       note = await Notes.findByIdAndDelete(req.params.id)
       res.json({"Sucess":"Note has be Deleted", note : note})
    }  catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal error occured");
    }
    }
);


module.exports = router;
