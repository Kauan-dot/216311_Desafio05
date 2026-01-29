const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3333;
const bookRoutes = require("./routes/books.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

