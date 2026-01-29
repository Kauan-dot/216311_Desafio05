const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/books.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);

app.listen(3333, () => {
  console.log("http://localhost:3333");
});
