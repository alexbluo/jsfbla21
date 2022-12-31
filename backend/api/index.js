const express = require("express");
const logger = require("morgan");
const attractionsRouter = require("../routes/attractions");
const filtersRouter = require("../routes/filters");

const app = express();

app.use(logger("dev"));

app.use("/api/attractions", attractionsRouter);
app.use("/api/filters", filtersRouter);

module.exports = app;
