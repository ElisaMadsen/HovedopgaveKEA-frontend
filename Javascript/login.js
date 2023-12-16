async function login() {
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;

    try {
        const response = await getResponse('http://localhost:8080/api/v1/user/login', 'POST', JSON.stringify({
            userEmail: userEmail,
            userPassword: userPassword,
        }));

        if (response.userId) {
            const userName = response.userName;
            const userId = response.userId;

            // Save user information to local storage
            saveUserInfo({ userId, userName, userEmail, userPassword });

            window.location.href = `user-landing-page.html?name=${userName}&userId=${userId}`;
        } else {
            console.error('Login failed');
            // Display error message for incorrect email or password
            showError('Incorrect email or password', 'errorContainer');
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        // Display a generic error message
        showError('Email eller kodeord er ikke korrekt', 'errorContainer');
    }
}

function showError(message, errorContainerId) {
    // Display error message underneath the specified container
    const errorContainer = document.getElementById(errorContainerId);
    errorContainer.innerHTML = `<div class="alert-danger">${message}</div>`;
}


function saveUserInfo(user) {
    localStorage.setItem('loggedIn', JSON.stringify(user));
    localStorage.setItem('userId', user.userId);
    console.log('User Info Saved:', user);
}

function logout() {
    // Clear user information from local storage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userId');
}
