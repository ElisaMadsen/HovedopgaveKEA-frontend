function redirectToCreatePost() {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
        window.location.href = `/create-post.html?userId=${userId}`;
    } else {
        // Handle the case where the user is not logged in
        alert('Bruger er ikke logget ind');
    }
}

function redirectToSettings() {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
        window.location.href = `/user-settings.html?userId=${userId}`;
    } else {
        // Handle the case where the user is not logged in
        alert('Bruger er ikke logget ind');
    }
}

function redirectToUserLandingPage() {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
        window.location.href = `/user-landing-page.html?userId=${userId}`;
    } else {
        // Handle the case where the user is not logged in
        alert('Bruger er ikke logget ind');
    }
}

function redirectToIndex() {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
        window.location.href = `/index.html?userId=${userId}`;
    } else {
        // Handle the case where the user is not logged in
        alert('Bruger er ikke logget ind');
    }
}

