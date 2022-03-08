const express = require("express");
const app = express();
const path = require("path");
const facetsRouter = require("./routes/facets");
const attractionsRouter = require("./routes/attractions");

// Serve the frontend build files in production
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
}

app.use("/api/attractions", attractionsRouter);
app.use("/api/facets", facetsRouter);

// Catches all other requests in case above routes are not
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
