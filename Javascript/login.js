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
            // Handle login failure, show an error message, etc.
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        // Handle other errors
    }
}

function saveUserInfo(user) {
    localStorage.setItem('loggedIn', JSON.stringify(user));
    localStorage.setItem('userId', user.userId);

}

function logout() {
    // Clear user information from local storage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userId');
}
