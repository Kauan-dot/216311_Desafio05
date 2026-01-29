const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/books.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

