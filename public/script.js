document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('username').value;
    const lastName = document.getElementById('surname').value;
    const major = document.getElementById('major').value;
    const year = new Date().getFullYear().toString().slice(-2);  // last 2 digits of the year
    const isGoodStudent = document.getElementById('status').checked;

    // Generate student ID
    const studentStatus = isGoodStudent ? 'D' : 'S';
    const studentId = `M.${major}${year}${studentStatus}${Math.floor(1000 + Math.random() * 9000)}`;

    const data = {
        firstName,
        lastName,
        major,
        studentId,
        isGoodStudent
    };

    try {
        const response = await fetch('http://localhost:3000/add-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.text();
            alert(result);
        } else {
            alert('Failed to register student.');
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});
