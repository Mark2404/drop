
async function fetchUsers() {
    const response = await fetch('http://localhost:3001/users');
    const data = await response.json();
    return data;
}


async function saveUsers(users) {
    await fetch('http://localhost:3001/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    });
}
async function loadUsers() {
    const users = await fetchUsers();
    updateTable(users);
}


async function addUser() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const age = document.getElementById('age').value;
    if (name && surname && age) {
        const users = await fetchUsers();
        const user = { id, name, surname, age };
        users.push(user);
        await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        updateTable(users);
        clearInputs();
    }
}
async function deleteUser(id) {
    let users = await fetchUsers();
    users = users.filter(user => user.id !== id);
    await fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE',
    });

    updateTable(users);
}
function updateTable(users) {
    const table = document.getElementById('userTable');
    table.innerHTML = '';
    users.forEach(user => {
        const row = `<tr>
            <td>${user.name}</td>
            <td>${user.surname}</td>
            <td>${user.age}</td>
            <td>
                <button >Edit</button>
                <button onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });
}

function clearInputs() {
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('age').value = '';
}

window.onload = loadUsers;
