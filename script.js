const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Render saved students on page load
window.onload = () => renderTable();

// Form submission
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const id = document.getElementById("studentID").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!validateInputs(name, id, email, contact)) return;

  const student = { name, id, email, contact };
  students.push(student);
  updateLocalStorage();
  renderTable();
  studentForm.reset();
});

// Render table rows
function renderTable() {
  studentTableBody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="actions">
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
    studentTableBody.appendChild(row);
  });
}

// Edit a student
function editStudent(index) {
  const student = students[index];
  document.getElementById("studentName").value = student.name;
  document.getElementById("studentID").value = student.id;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  deleteStudent(index);
}

// Delete a student
function deleteStudent(index) {
  students.splice(index, 1);
  updateLocalStorage();
  renderTable();
}

// Validate inputs
function validateInputs(name, id, email, contact) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const idRegex = /^\d+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !id || !email || !contact) {
    alert("All fields are required.");
    return false;
  }

  if (!nameRegex.test(name)) {
    alert("Name must contain only letters.");
    return false;
  }

  if (!idRegex.test(id)) {
    alert("ID must contain only numbers.");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    return false;
  }

  if (!idRegex.test(contact)) {
    alert("Contact number must contain only numbers.");
    return false;
  }

  return true;
}

// Update local storage
function updateLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}
