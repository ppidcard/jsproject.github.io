const loginButton = document.querySelector('#loginButton');
const loginUsername = document.querySelector('#loginUsername');
const loginPassword = document.querySelector('#loginPassword');
const loginInAll = document.querySelector('#loginInAll');
const loginPic = document.querySelector('#loginPic');

const account1 = {
    owner: 'Alexis Wang',
    firstName: 'Alexis',
    pin:85218966,
    email:'tvxqlikei@live.cn'
}

const account2 = {
    owner:'Lisa Wu',
    firstName:'Lisa',
    pin:8550,
    email:'lisaW@gmail.com'
}

const accounts = [account1, account2];

const createUsernames = function(accs){
    accs.forEach(function(acc){
        acc.username = acc.owner.toLocaleLowerCase().split(' ').map
        (name => name[0]).join('');

    });
 
}

createUsernames(accounts);

let currentAccount;

loginButton.addEventListener('click', function(){
    let currentAccount = accounts.find(acc => acc.username === loginUsername.value);
    if(currentAccount?.pin === Number(loginPassword.value)){    
        loginInAll.innerHTML = '';
        const markUp = `<div id='welcome'>Welcome, <b>${currentAccount.firstName}</b>!</div>
        <div id='users'>
        <img src='/img/${currentAccount.username}.jpg' id='userAvatar'>

        <ul class = 'userDetails'>
          <li><a>Finished</a></li>
          <li><a>Wanted</a></li>
          <li><a>In progress</a></li>
        </ul>
        </div>
        `
        ;
        

    return loginInAll.insertAdjacentHTML(`afterbegin`, markUp);

    }else{alert('Incorrect username or passward.')}

})

loginPic.addEventListener('click', function(){
    location.reload();
    return false;
    
})
