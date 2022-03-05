const express = require("express");
const app = express();
const facetsRouter = require("./routes/facets");
const attractionsRouter = require("./routes/attractions");

app.use("/api/attractions", attractionsRouter);
app.use("/api/facets", facetsRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("/frontend/dist"))
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`)); // listen on proxy
