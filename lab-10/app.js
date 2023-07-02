const express = require("express");
const { pokemon } = require("./utils");
const { get } = require("./remote");
const app = express();


const PORT = 3000;
let pokeName;

app.get("/", function (req, res) {
  res.json({
    message: "Laboratorio #10",
  });
});

app.get("/cache", async (req, res) => {
  res.json(pokemon.getCache());
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await pokemon.get(id);
  res.json(response);
});

app.listen(3000, () => {
  console.log(`SERVE ON PORT: ${PORT}.`);
});