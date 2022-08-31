var registBox = document.getElementById('registBox');
var registInputName = document.getElementById('registInputName');
var registInputEmail = document.getElementById('registInputEmail');
var registInputPassword = document.getElementById('registInputPassword') ;
var regexAlert = document.getElementById('regexAlert');
var regexAlert1 = document.getElementById('regexAlert1');
var registSingupBtn = document.getElementById('registSingupBtn');
var registSigninLink = document.getElementById('registSigninLink');
var signinBox = document.getElementById('signinBox');
var signinRegistLink = document.getElementById('signinRegistLink');
var signinInputEmail = document.getElementById ('signinInputEmail');
var signinInputPassword = document.getElementById('signinInputPassword');
var signinRegistBtn = document.getElementById('signinRegistBtn');
var indexBox = document.getElementById('indexBox');
var welcomeUser = document.getElementById('welcomeUser');
var lougout = document.getElementById('lougout');
var usersArray ;
//close sign in page and open registration page
signinRegistLink.addEventListener('click', function(){
    signinBox.classList.replace('d-block','d-none');
    registBox.classList.replace('d-none','d-block');
});
//close registration page and openg sign in  page
registSigninLink.addEventListener('click',function(){
    registBox.classList.replace('d-block','d-none');
    signinBox.classList.replace('d-none','d-block');
    regexAlert.classList.replace('d-block' , 'd-none') ;
});
//sign in to index page
lougout.addEventListener('click',function(){
    indexBox.classList.replace('d-flex','d-none');
    signinBox.classList.replace('d-none','d-block');
    clearSigninInp() ;
});
//return data from localstorge if it find
if (localStorage.getItem('users') == null) {
     usersArray = [];
} else {
     usersArray = JSON.parse(localStorage.getItem('users'));
}
// add new user by registration form
function addUsers(){ 
  if (validateUserName() == true && validateUserEmail() == true && validateUserPassword() == true)
{
    var user = {
        userName : registInputName.value,
        userEmail:registInputEmail.value,
        userPassword:registInputPassword.value,  
    }
     if ( checkEmail() != true) {
        usersArray.push(user);
        localStorage.setItem('users' , JSON.stringify(usersArray));
        regexAlert.innerHTML ='<span class="text-success mb-3">Success</span>' ;
        clearRegistInp() ;
     };  
  }
  else
  {
    regexAlert.innerHTML ='<span class="text-danger mb-3">All inputs is required</span>' ;
  };
};
registSingupBtn.addEventListener('click',addUsers);
// validation user name input
function validateUserName(){
    var regex = /^[A-Z][a-z ]{5,20}$/;
    if (regex.test(registInputName.value) == true) {
         return true ;
    }else{
        return false ;
    };   
};
// validation email input
function validateUserEmail(){
    var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (regex.test(registInputEmail.value) == true) {
        return true ;
    }else{
       return false ;
    }; 
};
// validation password input
function validateUserPassword(){
    var regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (regex.test(registInputPassword.value) == true) {
        return true ;
    }else{
       return false ;
    }; 
};
// sign in to index (old user)
function checkEmailPassword(){
    var signinEmail = signinInputEmail.value ;
    var signinPassword = signinInputPassword.value;
    localStorage.getItem('users');
    usersArray =JSON.parse(localStorage.getItem('users'));
    
        for (var i = 0; i < usersArray.length ; i++) {
           console.log(usersArray[i].userEmail)
           if (usersArray[i].userEmail == signinEmail && usersArray[i].userPassword == signinPassword) {
            signinBox.classList.replace('d-block','d-none'); 
            indexBox.classList.replace('d-none','d-flex');
            welcomeUser.innerHTML = `<h2 > welcome ${ usersArray[i].userName} </h2>`;
           }else{
            regexAlert1.innerHTML ='<span class="text-danger mb-3">All inputs is required</span>';
           };       
        } ; 
};
signinRegistBtn.addEventListener('click' , checkEmailPassword);
// check if email new email or it find in database
function checkEmail(){
    if (localStorage.getItem('users') == null) {
        usersArray = [];
   } else {
        usersArray = JSON.parse(localStorage.getItem('users'));
        for (var i = 0; i < usersArray.length ; i++) {
            console.log(usersArray[i].userEmail)
            if (usersArray[i].userEmail == registInputEmail.value ) {
             regexAlert.classList.replace( 'd-none' ,'d-block') ;
             regexAlert.innerHTML ='<span class="text-danger mb-3">email already exists</span>' ;
             return true ;
         } ;
     };
   }     
};
// clear input registration form
function clearRegistInp(){
    registInputName.value = ""; 
    registInputEmail.value = "" ; 
    registInputPassword.value = "";
}
// clear in put sign in page
function clearSigninInp(){
    signinInputEmail.value = "";
    signinInputPassword.value = "";
    regexAlert1.classList.replace('d-block' , 'd-none') ;  
}