const db = require("../database/db");

// CREATE
exports.createBook = (req, res) => {
  const { titulo, num_paginas, isbn, editora } = req.body;

  if (!titulo || !num_paginas || !isbn || !editora) {
    return res.status(400).json({
      message: "Preencha todos os campos"
    });
  }

  const sql = `
    INSERT INTO books (title, pages, isbn, publisher)
    VALUES (?, ?, ?, ?)
  `;

  db.run(
    sql,
    [titulo, num_paginas, isbn, editora],
    function (err) {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        id: this.lastID,
        titulo,
        num_paginas,
        isbn,
        editora
      });
    }
  );
};

// READ ALL
exports.getBooks = (req, res) => {
  db.all("SELECT * FROM books", (err, rows) => {
    if (err) return res.status(500).json(err);

    const livros = rows.map((row) => ({
      id: row.id,
      titulo: row.title,
      num_paginas: row.pages,
      isbn: row.isbn,
      editora: row.publisher
    }));

    res.json(livros);
  });
};

// READ BY ID
exports.getBookById = (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM books WHERE id = ?",
    [id],
    (err, row) => {
      if (err) return res.status(500).json(err);

      if (!row) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      res.json({
        id: row.id,
        titulo: row.title,
        num_paginas: row.pages,
        isbn: row.isbn,
        editora: row.publisher
      });
    }
  );
};

// UPDATE
exports.updateBook = (req, res) => {
  const { titulo, num_paginas, isbn, editora } = req.body;
  const { id } = req.params;

  if (!titulo || !num_paginas || !isbn || !editora) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios"
    });
  }

  db.run(
    `UPDATE books 
     SET title = ?, pages = ?, isbn = ?, publisher = ?
     WHERE id = ?`,
    [titulo, num_paginas, isbn, editora, id],
    function (err) {
      if (err) return res.status(500).json(err);

      if (this.changes === 0) {
        return res.status(404).json({
          message: "Livro não encontrado"
        });
      }

      res.json({
        message: "Livro atualizado com sucesso"
      });
    }
  );
};

// DELETE
exports.deleteBook = (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM books WHERE id = ?",
    [id],
    function (err) {
      if (err) return res.status(500).json(err);

      if (this.changes === 0) {
        return res.status(404).json({
          message: "Livro não encontrado"
        });
      }

      res.json({
        message: "Livro deletado com sucesso"
      });
    }
  );
};
