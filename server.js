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

// MySQL холбоот
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Oyunbat3a4b$',
    database: 'school_db'
});

connection.connect(err => {
    if (err) {
        console.error('MySQL connection error: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

// HTML file ажиллах хэсэг 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Оюутан нэмэх хэсэг 
app.post('/add-student', (req, res) => {
    const { firstName, lastName, major, isGoodStudent } = req.body;
    const year = new Date().getFullYear().toString().slice(-2); // Сүүлийн 2 орон сугалж авах хэсэг 

    const studentStatus = isGoodStudent ? 'S' : 'D';

    // Query
    const sqlGetLastId = `SELECT student_id FROM students 
                          WHERE student_id LIKE 'M.${major}${year}${studentStatus}%' 
                          ORDER BY student_id DESC LIMIT 1`;

    connection.query(sqlGetLastId, (err, results) => {
        if (err) {
            console.error('Error fetching last student ID:', err);
            return res.status(500).send('Error fetching last student ID');
        }

        //
        let nextNumber = '001';
        if (results.length > 0) {
            const lastId = results[0].student_id;
            const lastNumber = parseInt(lastId.slice(-3), 10); // Get last 3 digits
            nextNumber = (lastNumber + 1).toString().padStart(3, '0'); // Increment and pad with zeros
        }

        const studentId = `M.${major}${year}${studentStatus}${nextNumber}`;

        // Insert the new student into the database
        const sqlInsert = 'INSERT INTO students (student_name, student_surname, major, student_id) VALUES (?, ?, ?, ?)';
        connection.query(sqlInsert, [firstName, lastName, major, studentId], (err, result) => {
            if (err) {
                console.error('Error adding student:', err);
                return res.status(500).send('Failed to add student.');
            }
            res.send(`Student successfully registered with ID: ${studentId}`);
        });
    });
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on http://localhost:3000');
});
