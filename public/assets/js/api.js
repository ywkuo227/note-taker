const api = require("express").Router();
const { readFromFile, readAndAppend } = require("./fsUtils");
const uuid = require("uuid");

api.get("/notes", (req, res) => { readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data))); });

// api.get("/notes/:note", (req, res) => {
//     const activeNote = req.params.notes;
//     console.log(activeNote);
//     readFromFile("./db/db.json")
//         .then((data) => {
//             for (let i = 0; i < data.length; i++) {
//                 if (activeNote === data[i].note_id) {
//                     return res.json(JSON.parse(data[i]));
//                 }
//             }

//             return res.json(false);
//         });
// });

api.post("/notes", (req, res) => {
    const { id, title, text } = req.body;

    if (req.body) {
        const newNote = {
            id: uuid.v4(),
            title,
            text
        };

        readAndAppend(newNote, "./db/db.json");
        res.json("Note added successfully :) ");
    } else {
        res.error("Error in adding note :( ")
    }
});

module.exports = api;