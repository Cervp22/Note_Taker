const router = require("express").Router();
const path = require("path");
const uid = require("../helper/uid");
const fs = require("fs");

//GET request to see all data in the database
router.get("/api/notes", (req, res) => {
  const fileData = JSON.parse(fs.readFileSync("db/db.json"));
  res.status(500).json(fileData);
});

// Post notes into json database and to UI
router.post("/api/notes", (req, res) => {
  const fileData = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uid(),
  };
  fileData.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(fileData), "utf-8");
  res.json(fileData);
});

router.delete("/api/notes/:id", (req, res) => {
  const data = fs.readFileSync("db/db.json", "utf8");
  const dataJSON = JSON.parse(data);
  const newNotes = dataJSON.filter((note) => {
    return note.id !== req.params.id;
  });
  fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
  res.json("Note Deleted!");
  console.log(`id:${req.params.id} deleted!`);
});
module.exports = router;
