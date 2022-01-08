const express = require("express");
const app = express();
// const router = require("./routes/attractions")

app.get("/api/attractions", (req, res) => {
  res.send({ test: "success" })
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`))