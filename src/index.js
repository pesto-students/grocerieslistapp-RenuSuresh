const url = location.href;
const htmlPageIndex = url.lastIndexOf('/');
const baseUrl = url.substring(0,htmlPageIndex)
if(!localStorage.getItem('baseUrl')){
    localStorage.setItem('baseUrl',baseUrl)
}
const Registration = () =>{
   
   const name =  document.getElementById('name').value;
   const password = document.getElementById('password').value;
   const registeredUser = JSON.parse(localStorage.getItem('userData')) || [];
   if(!name || !password){
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

   }else if(registeredUser.length<3){

       const userDetails = {"name": name,"password":password,"groceryList":[]};
       registeredUser.push(userDetails);
       localStorage.setItem('userData',JSON.stringify(registeredUser));
       const loginUrl = baseUrl+'/login.html'.toString()
       window.location.replace(loginUrl)
   } else {
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