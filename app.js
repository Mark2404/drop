const addStudentBtn = document.getElementById("addStudentBtn");
const addForm = document.getElementById("add-form");
const studentModal = document.getElementById("studentModal");
const studentModalTitle = document.querySelector(".modal-title");
const tbody = document.querySelector(".table tbody");
const studentModalBtn = document.querySelector(".modal-btn");
let selectedIndex = null;
let searchValue = "";
let groupValue = "";
const users = getFromLocalStorage();
renderUsers();

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = addForm.firstName.value;
    const lastName = addForm.lastName.value;

    const hasWork = addForm.hasWork.checked;
    if (selectedIndex !== null) {
        users[selectedIndex] = {
            firstName,
            lastName,
            hasWork,
        };

        selectedIndex = null;
    } else {
        users.push({
            firstName,
            lastName,
            hasWork,
        });
    }
    saveToLocalStorage();

    addForm.reset();
    bootstrap.Modal.getInstance(studentModal).hide();
    renderUsers();
});

addStudentBtn.addEventListener("click", () => {
    studentModalTitle.textContent = "Add student";
    studentModalBtn.textContent = "Add";
});


function renderUsers() {
    tbody.innerHTML = "";
    let filteredUsers = users.filter((user) => {
        if (user.firstName.toLowerCase().includes(searchValue.toLowerCase()) || user.lastName.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    });
    filteredUsers.forEach((user, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.hasWork ? "Ha" : "Yo'q"}</td>
            <td>
                <button class="btn btn-warning delete" data-bs-toggle="modal" data-bs-target="#studentModal" onclick="editStudent(${i})"><i class="fa-solid fa-gear"></i></button>
                <button onclick="deleteStudent(${i})" class="btn btn-danger delete"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function saveToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}

function getFromLocalStorage() {
    const data = localStorage.getItem("users") || "[]";
    return JSON.parse(data);
}

function deleteStudent(index) {
    const isConfirm = confirm("Haqiqatdan o'chirmoqchimisiz?");
    if (!isConfirm) return;


    users.splice(index, 1);
    saveToLocalStorage();
    renderUsers();
}

function editStudent(index) {
    selectedIndex = index;
    studentModalTitle.textContent = "Edit student";
    studentModalBtn.textContent = "Edit";

    addForm.firstName.value = users[index].firstName;
    addForm.lastName.value = users[index].lastName;
    addForm.hasWork.checked = users[index].hasWork;
}



const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
    header.addEventListener('click', () => {
        const parent = header.parentElement;
        const content = parent.querySelector('.accordion-content');
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});