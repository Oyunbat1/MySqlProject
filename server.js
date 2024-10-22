const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Oyunbat3a4b$', // Use your actual password
    database: 'school_db'
});

connection.connect(err => {
    if (err) {
        console.error('MySQL connection error: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to add a student
app.post('/add-student', (req, res) => {
    const { firstName, lastName, major, studentId } = req.body;

    const sql = 'INSERT INTO students (student_name, student_surname, major, student_id) VALUES (?, ?, ?, ?)';
    connection.query(sql, [firstName, lastName, major, studentId], (err, result) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).send('Error registering student.');
        }
        res.send(`Student successfully registered with ID: ${studentId}`);
    });
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on http://localhost:3000');
});
