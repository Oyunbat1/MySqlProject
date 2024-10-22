const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// POST method -- ууд холбох хэсэг 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//  static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// MySQL холболт 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Oyunbat3a4b$',
    database: 'school_db'
});

connection.connect(err => {
    if (err) {
        console.error('MySQL холболтын алдаа: ', err);
        return;
    }
    console.log('MySQL амжилттай холбогдлоо...');
});

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Илгээх хэсэг
app.post('/add-student', (req, res) => {
    const { name, surname, register, studentID, major, status } = req.body;
    console.log('Received data:', req.body);

    const sql = 'INSERT INTO students (name, surname, register, student_id, major, status) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(sql, [name, surname, register, studentID, major, status], (err, result) => {
        if (err) {
            console.error('Оюутан оруулах алдаа:', err);  // Log server-side errors
            return res.status(500).send('Алдаа.');
        }
        console.log('Оюутан амжилттай нэмэгдлээ:', result);
        res.send('Оюутан амжилттай нэмэгдлээ:');
    });
});

app.listen(3000, () => {
    console.log('Server маань энэ host-ндээр асаж байна http://localhost:3000');
});
