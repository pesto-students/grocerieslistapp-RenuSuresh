const url = location.href;
const htmlPageIndex = url.lastIndexOf('/');
const baseUrl = url.substring(0, htmlPageIndex)
if (!localStorage.getItem('baseUrl')) {
    localStorage.setItem('baseUrl', baseUrl)
}
const login = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const user = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const userInfo = userData.filter(element => element.name == user)
    
    if (!userData || userInfo[0] == undefined) {
        let modal = document.getElementById("showLoginError");
        let span = document.getElementsByClassName("closeLogin")[0];
        let name = document.getElementById('name');
        let password = document.getElementById('password');

        span.onclick = function () {
            modal.style.display = "none";
            name.value = '';
            password.value = '';
            const baseUrl = localStorage.getItem('baseUrl')
            sessionStorage.clear();
            location.replace(baseUrl + '/register.html')
        }
        document.getElementById('showLoginError').style.display = 'block';
    } else {

        const userInfo = userData.filter(element => element.name == user && element.password == password)

        if (userInfo.length > 0) {
            const baseUrl = localStorage.getItem('baseUrl')
            location.replace(baseUrl + '/userGroceryList.html')

            sessionStorage.setItem('currentUser', JSON.stringify(userInfo[0]))
        } else if (userInfo.name != user || userInfo.password != password) {
            let modal = document.getElementById("showError");
            let span = document.getElementsByClassName("close")[0];
            let name = document.getElementById('name');
            let password = document.getElementById('password');

            span.onclick = function () {
                modal.style.display = "none";
                name.value = '';
                password.value = '';
            }
            document.getElementById('showError').style.display = 'block';
        }
    }
}