async function getPostDetails(postId) {
    try {
        const postDetailsResponse = await getResponse(`http://localhost:8080/api/v1/post/${postId}`, 'GET');

        // Log the response to see what you're getting
        console.log('postDetailsResponse:', postDetailsResponse);

        const postDetails = postDetailsResponse;  // Remove [0] since it's not an array


        // Log postDetails to check its structure
        console.log('postDetails:', postDetailsResponse);

        const showPostDetails = document.getElementById('post-details');


        const html = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="width: 80%; text-align: center; border: solid 1px;">
            <p style="font-size: 22px;">${postDetails.postTitle}</p>
        </div>
        <div style="width: 80%; text-align: left; border: solid 1px;">
            <p><strong>Forfatter:</strong> ${postDetails.userName}</p>
            <p><strong>Dato:</strong> ${formatDate(postDetails.postDate)}</p>
        </div>
        <div style="width: 80%; border: solid 1px;">
            <p>${postDetails.post}</p>
        </div>
    </div>
    
    
    `;

        showPostDetails.innerHTML = html;
    } catch (error) {
        console.error('Error fetching post details:', error);
    }

    // Helper function to format date as day, month, year
    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
}
