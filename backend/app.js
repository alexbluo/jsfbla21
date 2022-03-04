const express = require("express");
const app = express();
const path = require("path")
const facetsRouter = require("./routes/facets");
const attractionsRouter = require("./routes/attractions");

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/dist')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/dist/index.html'))
})

app.use("/api/attractions", attractionsRouter);
app.use("/api/facets", facetsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`)); // listen on proxy
