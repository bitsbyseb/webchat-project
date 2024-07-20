const $login = document.getElementById('login');

$login.addEventListener("click",e => {
    e.preventDefault();

    const user = document.querySelector('#username').value;

    if (user === "") {
        alert("please write a valid username");
        return;
    }

    document.cookie = `username=${user}`;
    document.location.href = "/"
})