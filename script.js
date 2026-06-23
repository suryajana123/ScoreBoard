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

    if (user === "Surya" && pass === "likho password") {
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
// Students ko image support ke saath
function getStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    // Purane students mein image nahi hai to default anime image daal do
    students.forEach(s => {
        if (!s.image) s.image = "https://via.placeholder.com/50?text=Anime";
    });
    return students;
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
// Default Data (Anime touch)
if (!localStorage.getItem("students")) {
    const students = [
        { name: "Naruto - Surya", score: 0 },
        { name: "Sasuke - Kamsahi", score: 0 },
        { name: "Goku - Rani", score: 0 }
    ];
    localStorage.setItem("students", JSON.stringify(students));
}
// ===================== NEW FUNCTION - ANIME STUDENT ADD =====================
function addAnimeStudent() {
    let prefix = document.getElementById("animePrefix").value.trim();
    let realName = document.getElementById("animeRealName").value.trim();

    if (realName === "") {
        alert("Student ka real naam to daal do!");
        return;
    }

    let fullName = prefix ? `${prefix} - ${realName}` : realName;

    let students = getStudents();

    let exists = students.some(student => 
        student.name.toLowerCase() === fullName.toLowerCase()
    );

    if (exists) {
        alert("Yeh naam pehle se hai!");
        return;
    }

    students.push({
        name: fullName,
        score: 0
    });

    saveStudents(students);
    alert(fullName + " added successfully! 🔥");
    location.reload();
}
// Students ko image support ke saath
function getStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    // Purane students mein image nahi hai to default anime image daal do
    students.forEach(s => {
        if (!s.image) s.image = "https://via.placeholder.com/50?text=Anime";
    });
    return students;
}
function addAnimeStudentWithImage() {
    let prefix = document.getElementById("animePrefix").value.trim();
    let realName = document.getElementById("animeRealName").value.trim();
    let imageUrl = document.getElementById("animeImageUrl").value.trim();

    if (realName === "") {
        alert("Student ka naam daal do!");
        return;
    }

    let fullName = prefix ? `${prefix} - ${realName}` : realName;
    let image = imageUrl || "https://via.placeholder.com/60?text=🧑‍🚀";

    let students = getStudents();

    if (students.some(s => s.name.toLowerCase() === fullName.toLowerCase())) {
        alert("Yeh naam pehle se hai!");
        return;
    }

    students.push({ name: fullName, score: 0, image: image });
    saveStudents(students);
    alert(fullName + " with Anime Picture added! 🔥");
    location.reload();
}
function uploadImageAndAdd() {
    let fileInput = document.getElementById("imageUpload");
    let prefix = document.getElementById("animePrefix").value.trim();
    let realName = document.getElementById("animeRealName").value.trim();

    if (!fileInput.files[0] || realName === "") {
        alert("Image aur Student Name dono chahiye!");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(e) {
        let base64Image = e.target.result;   // Image base64 mein save hogi

        let fullName = prefix ? `${prefix} - ${realName}` : realName;

        let students = getStudents();
        students.push({ name: fullName, score: 0, image: base64Image });
        saveStudents(students);
        alert(fullName + " with Custom Image added! 🔥");
        location.reload();
    };
    reader.readAsDataURL(fileInput.files[0]);
}
