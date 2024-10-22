const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Oyunbat3a4b$',
    database: 'school_db'
});

connection.connect(err => {
    if (err) {
        console.error('MySQL холболт алдаа гарлаа: ', err);
        return;
    }
    console.log('MySQL тэй холбогдлоо');
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/add-student', (req, res) => {
    const { name, studentID, class: studentClass } = req.body;
    const sql = 'INSERT INTO students (student_name, student_id, class) VALUES (?, ?, ?)';

    connection.query(sql, [name, studentID, studentClass], (err, result) => {
        if (err) {
            console.error('Алдаа гарлаа:', err);
            return res.status(500).send('Сурагч нэмэх үед алдаа гарлаа.');
        }
        res.send('Сурагч амжилттай нэмэгдлээ!');
    });
});


app.get('/students', (req, res) => {
    connection.query('SELECT * FROM students', (err, results) => {
        if (err) {
            console.error('Алдаа гарлаа:', err);
            return res.status(500).send('Сурагчийн жагсаалт авах үед алдаа гарлаа.');
        }
        res.json(results);
    });
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
