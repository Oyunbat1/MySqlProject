document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const studentID = document.getElementById('studentID').value;
    const studentClass = document.getElementById('class').value;

    const data = { name, studentID, class: studentClass };

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
            alert('Failed to add student.');
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});
