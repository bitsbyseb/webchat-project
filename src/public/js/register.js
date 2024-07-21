const $login = document.getElementById('login');
const $imgUrl = document.getElementById("imgUrl");

$login.addEventListener("click",e => {
    e.preventDefault();

    const user = document.querySelector('#username').value;
    const imgUrl = $imgUrl.value;

    if (user === "" || imgUrl.value === "") {
        alert("please write a valid username or url");
        return;
    }

    document.cookie = `username=${user};`;
    document.cookie = `imgUrl=${imgUrl};`;
    document.location.href = "/"
});