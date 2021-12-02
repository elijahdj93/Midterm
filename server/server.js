const express = require("express");
const cors = require("cors");
const controller = require("./controller");
const app = express();

app.use(express.json());
app.use(cors());
// app.use(express.static("client"));
let favs = [
  {
    id: 1,
    place: "Chili's",
  },
  {
    id: 2,
    place: "Texas Roadhouse",
  },
];

app.get("/", (req, res) => {
  res.json(favs);
});
app.post("/", (req, res) => {
  console.log(req.body);
  const body = {
    id: Date.now(),
    place: req.body.place,
  };
  favs.push(body);
  res.json(favs);
});
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const filteredPlaces = favs.filter((item) => item.id != id);
  favs = filteredPlaces;
  res.json(favs);
});
app.listen(4455, () => console.log("Server is running on port 4455"));
