async function getAllPosts() {
    try {
        const postsResponse = await getResponse('http://localhost:8080/api/v1/post/posts/all', 'GET');
        const showPosts = document.querySelector("#show-posts");

        // Add table header outside the loop
        const tableHeader = `
            <table style="width:100%">
                <thead>
                    <tr>
                        <th>Studieretning</th>
                        <th>Overskrift</th>
                        <th>Forfatter</th>
                        <th>Dato</th>
                    </tr>
                </thead>
                <tbody id="post-table-body">
                </tbody>
            </table>
        `;
        showPosts.innerHTML = tableHeader;

        const tableBody = document.getElementById('post-table-body');

        for (const post of postsResponse) {
            // Log the entire post object for debugging
            console.log('Current post:', post);

            // Check if post.user is defined
            if (post.user) {
                const html = `
                    <tr data-post-id="${post.postId}">
                        <td>${post.user.fieldOfStudy}</td>
                        <td>${post.postTitle}</td> 
                        <td>${post.user.userName}</td> 
                        <td>${formatDate(post.postDate)}</td> 
                    </tr>
                `;

                tableBody.insertAdjacentHTML("beforeend", html);
            } else {
                console.error(`Post ${post.postId} is missing user information.`);
            }
        }

        // Modify the event listener for each row
        const rows = tableBody.querySelectorAll("tr[data-post-id]");
        rows.forEach(row => {
            row.addEventListener("click", () => {
                const postId = row.dataset.postId;
                // Navigate to the post details page with the postId as a query parameter
                window.location.href = `/post-details.html?postId=${postId}`;
            });
        });
    } catch (error) {
        console.error('Error fetching or processing posts:', error);
    }
}
