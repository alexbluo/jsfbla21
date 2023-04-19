const path = require("path");
const express = require("express");
const logger = require("morgan");
const attractionsRouter = require("../routes/attractions");
const filtersRouter = require("../routes/filters");

const app = express();

app.use(logger("dev"));

app.use("/api/attractions", attractionsRouter);
app.use("/api/filters", filtersRouter);

// catch all other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

module.exports = app;

// app.listen(5000)
