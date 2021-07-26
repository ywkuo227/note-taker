// Require Express.js Router, functions from fileOps and UUID.
const api = require("express").Router();
const { readFromFile, readAndAppend, deleteAndWrite } = require("./fileOps");
const uuid = require("uuid");

// API GET Route to retrieve all stored notes.
api.get("/notes", (req, res) => { readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data))); });

// API POST Route to post new note to the store.
api.post("/notes", (req, res) => {
    const { title, text } = req.body;

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

// API DELETE Route to delete note entry by ID.
api.delete("/notes/:id", (req, res) => {
    const idToDel = req.params.id;
    deleteAndWrite(idToDel, "./db/db.json");
    return res.json("Note entry deleted");
});

module.exports = api;