const express = require('express');
const path = require('path');
const multer = require('multer');
const db = require('./db');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    let userList = results.map(u => `<li>${u.name} - ${u.filename || 'No file'}</li>`).join('');
    res.send(`
      <html>
      <head><link rel="stylesheet" href="/style.css"></head>
      <body>
        <h1>User List</h1>
        <ul>${userList}</ul>
        <form action="/submit" method="POST" enctype="multipart/form-data">
          <input type="text" name="name" placeholder="Enter name" required />
          <input type="file" name="file" />
          <button type="submit">Submit</button>
        </form>
      </body>
      </html>
    `);
  });
});

app.post('/submit', upload.single('file'), (req, res) => {
  const name = req.body.name;
  const filename = req.file ? req.file.filename : null;

  db.query('INSERT INTO users (name, filename) VALUES (?, ?)', [name, filename], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
