async function getUsersPostDetails(userId) {
    try {
        const usersPostDetailsResponse = await getResponse(`http://localhost:8080/api/v1/user/${userId}/posts`, 'GET');
        
        console.log('usersPostDetailsResponse:', usersPostDetailsResponse);

        const posts = usersPostDetailsResponse;

        console.log('posts:', posts);

        const showUsersPostDetails = document.getElementById('user-posts');

        const html = `
        <div>
            <p>Dine indlæg</p>
            <hr style="color: black; opacity: 1;">
            ${posts.map(post => `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <p style="margin: 0 auto;">${post.postTitle}</p>
                    <button class="btn btn-close delete-post" data-post-id="${post.postId}"></button>
                </div>
            `).join('')}
        </div>
    `;
    

        showUsersPostDetails.innerHTML = html;

        // Bind deletePost function to delete-post buttons
        const deleteButtons = document.querySelectorAll('.delete-post');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => deletePost(button.dataset.postId));
        });
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
}

async function deletePost(postId) {
    const shouldDelete = confirm(`Er du sikker på at du gerne vil slette dette indlæg?`);
    
    if (shouldDelete) {
        await fetch(`http://localhost:8080/api/v1/post/${postId}`, { method: 'DELETE' });
        console.log(`Post with ID ${postId} is deleted`);
        window.location.reload();
    } else {
        console.log(`Post with ID ${postId} was not deleted`);
    }
}
