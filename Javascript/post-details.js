async function getPostDetails(postId) {
    try {
        const postDetailsResponse = await getResponse(`http://localhost:8080/api/v1/post/${postId}`, 'GET');
        
        // Log the response to see what you're getting
        console.log('postDetailsResponse:', postDetailsResponse);

        const postDetails = postDetailsResponse;  // Remove [0] since it's not an array

        // Log postDetails to check its structure
        console.log('postDetails:', postDetails);

        const showPostDetails = document.getElementById('post-details');

        const html = `
            <div>
                <p><strong>Studieretning:</strong> ${postDetails.fieldOfStudy}</p>
                <p><strong>Overskrift:</strong> ${postDetails.postTitle}</p>
                <p><strong>Forfatter:</strong> ${postDetails.userName}</p>
                <p><strong>Dato:</strong> ${formatDate(postDetails.postDate)}</p>
                <p><strong>Indhold:</strong> ${postDetails.post}</p>
                <!-- Add more details as needed -->
            </div>
        `;

        showPostDetails.innerHTML = html;
    } catch (error) {
        console.error('Error fetching post details:', error);
    }
}
