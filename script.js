// Default Data

if (!localStorage.getItem("students")) {
    const students = [
        { name: "Rani", score: 0 },
        { name: "Surya", score: 0 },
        { name: "Kamsahi", score: 0 }
    ];

    localStorage.setItem("students", JSON.stringify(students));
}

// Admin Login

function adminLogin() {
    let user = document.getElementById("adminUser").value;
    let pass = document.getElementById("adminPass").value;

    if (user === "Surya" && pass === "Surya1234") {
        window.location.href = "admin.html";
    } else {
        alert("Wrong Username or Password");
    }
}

// Student Login

function studentLogin() {
    let name = document.getElementById("studentName").value;

    localStorage.setItem("currentStudent", name);

    window.location.href = "student.html";
}

// Get Students

function getStudents() {
    return JSON.parse(localStorage.getItem("students"));
}

// Save Students

function saveStudents(data) {
    localStorage.setItem("students", JSON.stringify(data));
}

// Add Score

function addScore(name) {
    let students = getStudents();

    students.forEach(student => {
        if (student.name === name) {
            student.score += 2;
        }
    });

    saveStudents(students);
    location.reload();
}

// Minus Score

function minusScore(name) {
    let students = getStudents();

    students.forEach(student => {
        if (student.name === name) {
            student.score -= 2;
        }
    });

    saveStudents(students);
    location.reload();
}

// Reset Score

function resetScore(name) {
    let students = getStudents();

    students.forEach(student => {
        if (student.name === name) {
            student.score = 0;
        }
    });

    saveStudents(students);
    location.reload();
}

// Logout

function logout() {
    window.location.href = "index.html";
}
function customScore(name) {

    let value = parseInt(
        document.getElementById("input_" + name).value
    );

    if(isNaN(value)){
        alert("Enter a valid number");
        return;
    }

    let students = getStudents();

    students.forEach(student => {
        if(student.name === name){
            student.score += value;
        }
    });

    saveStudents(students);
    location.reload();
}
function addStudent() {

    let name =
        document.getElementById("newStudent").value.trim();

    if(name === ""){
        alert("Enter Student Name");
        return;
    }

    let students = getStudents();

    let exists = students.some(student =>
        student.name.toLowerCase() === name.toLowerCase()
    );

    if(exists){
        alert("Student Already Exists");
        return;
    }

    students.push({
        name: name,
        score: 0
    });

    saveStudents(students);

    alert("Student Added Successfully");

    location.reload();
}window.onload = function() {

    let dropdown =
        document.getElementById("studentName");

    if(dropdown){

        let students = getStudents();

        students.forEach(student => {

            dropdown.innerHTML += `
                <option value="${student.name}">
                    ${student.name}
                </option>
            `;
        });
    }
};
function removeStudent(name) {

    let confirmDelete =
        confirm("Delete " + name + " ?");

    if(!confirmDelete){
        return;
    }

    let students = getStudents();

    students = students.filter(student =>
        student.name !== name
    );

    saveStudents(students);

    location.reload();
}