document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();


    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const register = document.getElementById('register').value;
    const major = document.getElementById('major').value;
    const status = document.getElementById('status').checked;

    //  student ID үүсгэх
    const studentID = generateStudentID(major, status);


    const data = { name, surname, register, studentID, major, status };

    try {
        console.log('Submitting data:', data);
        const response = await fetch('http://localhost:3000/add-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),  //  JSON format луу хөрвүүлэх
        });


        if (response.ok) {
            const result = await response.text();
            alert(result);
        } else {
            const errorText = await response.text();
            alert('Сурагч нэмэхэд алдаа гарлаа: ' + errorText);
        }
    } catch (error) {
        console.error('Илгээхэд алдаа гарлаа:', error);  // Log the error
        alert('Алдаа гарлаа: ' + error.message);
    }
});


function generateStudentID(major, status) {
    const currentYear = new Date().getFullYear().toString().slice(2);
    const majorCode = major.toUpperCase();
    const statusCode = status ? 'S' : 'D';
    let lastID = 1;
    const formattedID = lastID.toString().padStart(3, '0');
    return `M.${majorCode}${currentYear}${statusCode}${formattedID}`;
}
