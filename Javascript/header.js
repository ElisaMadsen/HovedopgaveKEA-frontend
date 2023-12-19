
$(function () {
    // Check if the user is logged in based on localStorage
    const isLoggedIn = localStorage.getItem('loggedIn') !== null;

    // Load the appropriate header based on the login status
    const headerPath = isLoggedIn ? 'header-logged-in.html' : 'header.html';
    $("#header").load(headerPath);
});

