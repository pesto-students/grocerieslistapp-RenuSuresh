const url = location.href;
const htmlPageIndex = url.lastIndexOf('/');
const baseUrl = url.substring(0, htmlPageIndex)
if (!localStorage.getItem('baseUrl')) {
    localStorage.setItem('baseUrl', baseUrl)
}
const addItem = () => {
    const currentUserDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    let item = document.getElementById('item').value;
    if (!item) {
        this.errorModal("Please enter the item.")
    }
    else if (currentUserDetails.groceryList.length < 5) {
        const listItem = currentUserDetails.groceryList.filter(element => element == item);
        if (listItem[0] != undefined) {
            this.errorModal('Item available in list.')
        } else {

            let list = document.getElementById('list');
            currentUserDetails.groceryList.push(item)
            sessionStorage.setItem('currentUser', JSON.stringify(currentUserDetails))

            list.innerHTML += `<li id ="list${currentUserDetails.groceryList.length - 1}"> <span>${currentUserDetails.groceryList.length}</span> ${item}  <span class="update-btn"><button onclick="remove(${currentUserDetails.groceryList.length - 1})" class="remove-btn" >-</button> <button onclick = "showEdit(${currentUserDetails.groceryList.length - 1})" class="edit-btn"> edit </button></span></li>`;

        }
    } else {
        this.errorModal('Only 5 items in list are allowed.')
    }
}

function updateUserData() {
    const currentUserDetails = JSON.parse(sessionStorage.getItem('currentUser'))

    let registeredUser = JSON.parse(localStorage.getItem('userData'));
    registeredUser.filter((element, index) => {
        if (element.name == currentUserDetails.name) {
            registeredUser.splice(index, 1);
        }
    });
    localStorage.setItem('userData', JSON.stringify(registeredUser));
    registeredUser = JSON.parse(localStorage.getItem('userData'));
    registeredUser.push(currentUserDetails);
    localStorage.setItem('userData', JSON.stringify(registeredUser))
}

function remove(index) {
    const currentUserDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    currentUserDetails.groceryList.splice(index, 1);
    sessionStorage.setItem('currentUser', JSON.stringify(currentUserDetails));
    location.reload()
}

function getGroceryList() {
    const list = JSON.parse(sessionStorage.getItem('currentUser'));
    const currentUserDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUserDetails) {
        this.errorModal('Please Login.')

    } else {
        var node = document.createElement("label");
        node.setAttribute("id", "username-label")
        var textnode = document.createTextNode(`Hi, ${list.name}`);
        node.appendChild(textnode);
        document.getElementById("username").prepend(node);


        list.groceryList.forEach((element, index) => {
            document.getElementById('list').innerHTML += `<li id="list${index}"><span class="order-list">${index + 1}</span> ${element}  <span class="update-btn"><button onclick="remove(${index})" class="remove-btn" >-</button>  <button onclick = "showEdit(${index})" class="edit-btn"> edit </button></span></li>`
        });
    }
}

function goToLogin() {
    const baseUrl = localStorage.getItem('baseUrl')
    sessionStorage.clear();
    location.replace(baseUrl + '/login.html')
}

function logout() {
    updateUserData();
    goToLogin();
}

function showEdit(index) {
    var node = document.createElement("p");
    var textnode = document.createTextNode(`You're editing item ${index + 1}`);
    node.appendChild(textnode);
    // appending index of item at the beginning 
    document.getElementById("contentId").prepend(node);
    document.getElementById('divEdit').style.display = "block";
    document.getElementById('confirmEdit').setAttribute("onclick", `editList(${index})`)
    document.getElementById('editItem').value = '';
}

function editList(index) {
    const currentUserDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    var parent = document.getElementById("contentId");
    parent.removeChild(parent.childNodes[0]);

    const edit = document.getElementById('editItem').value;
    if (!edit) {
        this.errorModal('No item is given')
    } else {
        const listItem = currentUserDetails.groceryList.filter(element => element == edit);
        if (listItem[0] != undefined) {
            this.errorModal('Item available in list.')
        } else {

            // current user is updated
            const currentUserDetails = JSON.parse(sessionStorage.getItem('currentUser'))
            currentUserDetails.groceryList[index] = edit
            sessionStorage.setItem('currentUser', JSON.stringify(currentUserDetails))
            // appending list with buttons and class
            document.getElementById(`list${index}`).innerHTML = `<span class="order-list">${index + 1}</span> ${edit}  <span class="update-btn"><button onclick="remove(${index})" class="remove-btn" >-</button>  <button onclick = "showEdit(${index})" class="edit-btn"> edit </button></span>`;
        }
    }
    document.getElementById('divEdit').style.display = "none";
}
function errorModal(error) {
    let modal = document.getElementById("showError");
    let span = document.getElementsByClassName("close")[0];
    let item = document.getElementById('item');

    document.getElementById('error').textContent = error
    span.onclick = function () {
        modal.style.display = "none";
        if (error == 'Please Login.') {
            goToLogin();
        }
        item.value = ''
    }
    document.getElementById('showError').style.display = 'block';
    document.getElementById('item').value = ''

}