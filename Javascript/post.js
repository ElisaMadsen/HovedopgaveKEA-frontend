async function getAllPosts() {
    const postsResponse = await getResponse('http://localhost:8080/api/v1/post/posts/all', 'GET');
    console.log(postsResponse)
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
        const rows = tableBody.querySelectorAll("tr.clickable-row");
        rows.forEach(row => {
            row.addEventListener("click", () => {
                const postId = row.dataset.postId;
                // Navigate to the post details page with the postId as a query parameter
                window.location.href = `/post-details.html?postId=${postId}`;
            });
        });
}


// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
