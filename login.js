function login(){
    const email=document.getElementById('email').value;
    const password = document.getElementById('password').value;

if(email==='admin@gmail.com'&&password==='admin1234'){
    alert('Login success');
    window.location.href='admin.html';
}else{
    alert('Wrong email or password');
}
}