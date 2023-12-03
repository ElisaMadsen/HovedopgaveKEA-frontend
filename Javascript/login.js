async function login () {

    const data = await getResponse('http://localhost:8080/api/v1/user/users/all','GET');

    const userEmail = document.getElementById('userEmail').value;
    const userPassword =document.getElementById('userPassword').value;
    console.log('username: ' + userEmail + ' password: ' + userPassword);

   data.forEach(users => {
        const fetchedUserEmail = users.userEmail;
        const fetchedUserPassword = users.userPassword;
        console.log('User email + password: ' + fetchedUserEmail + ' ' + fetchedUserPassword);

        if(fetchedUserPassword == userPassword && fetchedUserEmail == userEmail){
   
            saveUsers(users)

            const userName = users.userName;
            const userId = users.userId;

            window.location.href = `user-landing-page.html?name=${userName}&userId=${userId}`;
        } 
    });
}

function saveUsers(users){
    localStorage.setItem('loggedIn', users.userId) 
}
