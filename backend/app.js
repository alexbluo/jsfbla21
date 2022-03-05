const express = require("express");
const app = express();
const path = require("path");
const facetsRouter = require("./routes/facets");
const attractionsRouter = require("./routes/attractions");

app.use(express.static(path.join(__dirname, "frontend/build")));

app.use("/api/attractions", attractionsRouter);
app.use("/api/facets", facetsRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
// });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`)); // listen on proxy
