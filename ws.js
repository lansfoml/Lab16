const express = require('express');
const fs = require('fs');
const mysql = require('mysql');

const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
const connection = mysql.createConnection(credentials);

const service = express();

connection.connect(error => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

// define endpoints...

const port = 5001;
service.listen(port, () => {
  console.log(`We're live in port ${port}!`);
});

function rowToHuman(row) {
    return {
      id: row.id,
      username: row.username,
      screenname: row.screenname
    };
  }

  service.get('/humans/:id', (request, response) => {
    const parameters = [
      parseInt(request.params.id)
      
    ];
  
    const query = 'SELECT * FROM humans WHERE id = ?';
    connection.query(query, parameters, (error, rows) => {
      if (error) {
        response.status(500);
        response.json({
          ok: false,
          results: error.message,
        });
      } else {
        const humans = rows.map(rowToHuman);
        response.json({
          ok: true,
          results: rows.map(rowToHuman),
        });
      }
    });
  });

  service.use(express.json());

  service.post('/humans', (request, response) => {
    const parameters = [
      request.body.username,
      request.body.screenname
    ];
  
    const query = 'INSERT INTO humans(username, screenname) VALUES (?, ?)';
    connection.query(query, parameters, (error, result) => {
      if (error) {
        response.status(500);
        response.json({
          ok: false,
          results: error.message,
        });
      } else {
        response.json({
          ok: true,
          results: result.insertId,
        });
      }
    });
  });