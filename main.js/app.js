const usernameInput = document.getElementById('usernameInput');
const userInfo = document.getElementById('userInfo');
const errorMessage = document.getElementById('errorMessage');
const avatar = document.getElementById('avatar');
const name = document.getElementById('name');

function searchUser(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();

    userInfo.style.display = 'none';
    errorMessage.style.display = 'none';

    if (!username) {
        errorMessage.textContent = 'Please enter a username.';
        errorMessage.style.display = 'block';
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            avatar.src = data.avatar_url;
            name.textContent = data.name || 'ismi yoq';
            userInfo.style.display = 'block';
        })
        .catch(error => {
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        });
}