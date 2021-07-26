// Require Express.js, Path and API Router.
const express = require("express");
const path = require("path");
const api = require("./public/assets/js/api");

// Set up the port the Express server will be listening to.
const app = express();
var PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static('public'));

// GET Route for Notes Page
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// GET Route for Landing Page.
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

app.listen(PORT, () => console.log(`Server is listening to Port: ${PORT}`));