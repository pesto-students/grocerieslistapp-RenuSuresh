const url = location.href;
const htmlPageIndex = url.lastIndexOf('/');
const baseUrl = url.substring(0, htmlPageIndex)
if (!localStorage.getItem('baseUrl')) {
    localStorage.setItem('baseUrl', baseUrl)
}

const Registration = () => {
    console.log('registration')

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const registeredUser = JSON.parse(localStorage.getItem('userData')) || [];
    const userDetails = { "name": name, "password": password, "groceryList": [] };

    if (name == '' || password == '') {
        let modal = document.getElementById("showNoInputError");
        let span = document.getElementsByClassName("closeInputModal")[0];
        let name = document.getElementById('name');
        let password = document.getElementById('password');

        span.onclick = function () {
            modal.style.display = "none";
            name.value = '';
            password.value = '';
        }
        document.getElementById('showNoInputError').style.display = 'block';

    } else {
        const usernameAvailable = registeredUser.filter(element => element.name == name);
        
        if (usernameAvailable[0] != undefined) {
            let modal = document.getElementById("showError");
            let span = document.getElementsByClassName("close")[0];
            let name = document.getElementById('name');
            let password = document.getElementById('password');
            document.getElementById('error').textContent = "User already present."
            span.onclick = function () {
                modal.style.display = "none";
                name.value = '';
                password.value = '';
            }
            document.getElementById('showError').style.display = 'block';

        } else {
            if (registeredUser.length > 3) {
                registeredUser.splice(0, 1);
                localStorage.setItem('userData', JSON.stringify(registeredUser));
            }
            registeredUser.push(userDetails);
            localStorage.setItem('userData', JSON.stringify(registeredUser));
            const loginUrl = baseUrl + '/login.html'.toString()
            window.location.replace(loginUrl)
        }
    }

}