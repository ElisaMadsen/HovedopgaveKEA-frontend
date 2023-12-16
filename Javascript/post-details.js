let isLoginForComment = false;

async function getPostDetails(postId) {
    try {
        const postDetailsResponse = await getResponse(`http://localhost:8080/api/v1/post/${postId}`, 'GET');

        // Fetch associated comments for the post
        const commentsResponse = await getResponse(`http://localhost:8080/api/v1/comment/${postId}/comments`, 'GET');
        const comments = commentsResponse || [];

        const showPostDetails = document.getElementById('post-details');

        const html = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="width: 90%; text-align: center; border: solid 1px;">
                <p style="font-size: 22px;">${postDetailsResponse.postTitle}</p>
            </div>
            <div style="width: 90%; text-align: left; border: solid 1px;">
                <p><strong>Forfatter:</strong> ${postDetailsResponse.userName}</p>
                <p><strong>Dato:</strong> ${formatDate(postDetailsResponse.postDate)}</p>
            </div>
            <div style="width: 90%; border: solid 1px;">
                <p>${postDetailsResponse.post}</p>
            </div>
            <div id="commentSection" style="width: 90%; text-align: left; margin-top:5px;">
                <div id="kommenterDiv" style="text-decoration: underline; cursor: pointer;">Kommentér på denne tråd</div>
                <div id="commentField" style="display: none; margin-top: 10px;">
                    <input type="text" id="comment" placeholder="Write your comment" style="padding: 5px; margin-right: 5px;">
                    <button id="kommenterButton" style="padding: 5px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">Kommenter</button>
                </div>
            </div>
            <div id="commentContainer" style="width: 90%; margin-top: 10px; text-align: center;">
            <!-- Display existing comments -->
                ${comments.map(comment => `
                <div style="margin-bottom: 8px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background-color: #f9f9f9;">
                    <div style="width: 90%; text-align: left; margin-top:5px;">
                        <p><strong>Forfatter:</strong> </p>
                        <p><strong>Dato:</strong> </p>
                    </div>

                    <p style="margin: 0;">${comment.comment}</p>
                </div>`).join('')}
            </div>
        </div>
        `;

        showPostDetails.innerHTML = html;

        // Add event listener for "Kommentér på denne tråd" button
        document.getElementById('kommenterDiv').addEventListener('click', toggleCommentField);
        // Add event listener for "Kommenter" button
        document.getElementById('kommenterButton').addEventListener('click', () => postComment(postId));
    } catch (error) {
        console.error('Error fetching post details:', error);
    }

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
}

// Function to post a comment
async function postComment(postId) {
    const commentInput = document.getElementById('comment');
    const commentText = commentInput.value;

    const loggedInUser = JSON.parse(localStorage.getItem('loggedIn'));
    const token = loggedInUser ? loggedInUser.token : null;

    // Log user data
    console.log('User Data:', loggedInUser);

    if (commentText.trim() !== '') {
        const commentData = { comment: commentText, commentDate: new Date().toISOString() };

        try {
            // Send the comment to the server using fetch
            await fetch(`http://localhost:8080/api/v1/comment/createComment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            // Fetch and display the updated comments
            getPostDetails(postId);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }
}

function toggleCommentField() {
    // Reset the flag before showing the comment field
    isLoginForComment = false;

    const commentField = document.getElementById('commentField');
    
    // Check if the user is logged in
    if (checkUserLoggedIn()) {
        // Display the comment field only if the user is logged in
        commentField.style.display = commentField.style.display === 'none' ? 'block' : 'none';
    } else {
        // Redirect or show a login prompt if the user is not logged in
        window.location.href = 'login.html'; // Replace with the actual login page URL
    }
}


// Function to check if the user is logged in (example implementation)
function checkUserLoggedIn() {
    // Implement your logic to check if the user is logged in
    // For example, you can check if the user information is present in local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedIn'));
    return loggedInUser !== null && loggedInUser.userId; // Check for a valid user ID or additional conditions
}




