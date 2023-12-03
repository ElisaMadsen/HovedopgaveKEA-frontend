function redirectToCreatePost() {
    const userId = localStorage.getItem('loggedIn');
    
    if (userId) {
        window.location.href = `/create-post.html?userId=${userId}`;
    } else {
        // Handle the case where the user is not logged in
        alert('User not logged in.');
    }
}
