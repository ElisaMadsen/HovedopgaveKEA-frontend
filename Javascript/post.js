async function getAllPosts() {
    const postsResponse = await getResponse('http://localhost:8080/api/v1/post/posts/all', 'GET');
    console.log(postsResponse)
    const showPosts = document.querySelector("#show-posts");

    // Add table header outside the loop
    const tableHeader = `
        <table style="width:100%">
            <thead>
                <tr>
                    <th>STUDIERETNING</th>
                    <th>OVERSKRIFT</th>
                    <th>FORFATTER</th>
                    <th>DATO</th>
                </tr>
            </thead>
            <tbody id="post-table-body">
            </tbody>
        </table>
    `;
    showPosts.innerHTML = tableHeader;

    const tableBody = document.getElementById('post-table-body');

    for (const post of postsResponse) {

        const html = `
        <tr class="clickable-row" data-post-id="${post.postId}">
                <td>${post.fieldOfStudyName}</td>
                <td>${post.postTitle}</td> 
                <td>${post.userName}</td> 
                <td>${formatDate(post.postDate)}</td> 
            </tr>
        `;

        tableBody.insertAdjacentHTML("beforeend", html);
    }

        // Add event listener to each row
        // Check if the user is logged in
        const loggedInUser = JSON.parse(localStorage.getItem('loggedIn'));

        // Add event listener to each row
        const rows = tableBody.querySelectorAll("tr.clickable-row");
        rows.forEach(row => {
            row.addEventListener("click", () => {
                const postId = row.dataset.postId;

                // If the user is logged in, include userId in the URL
                if (loggedInUser && loggedInUser.userId) {
                    window.location.href = `/post-details.html?postId=${postId}&userId=${loggedInUser.userId}`;
                } else {
                    // Navigate to the post details page with only postId as a query parameter
                    window.location.href = `/post-details.html?postId=${postId}`;
                }
            });
        });

}


// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
