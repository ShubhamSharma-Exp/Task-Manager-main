import axios from 'axios';
signIn();

function signIn(){
  if(localStorage.getItem('token')){
    console.log(localStorage.getItem('token'));
    window.location.replace(window.location.origin+"/home.html");
  }
  else{
  

const u = document.querySelector('.box');
      u.addEventListener("submit", (e) => {
       e.preventDefault();
        axios.post('http://localhost:3000/users/login', {
         
          email: u.elements[0].value,
          password: u.elements[1].value,
      
        }).then((response) => {
          if (response.status === 200) {
            window.alert("Success")
            localStorage.setItem('token',response.data.token);
            u.elements[0].value="";
             u.elements[1].value="";
             window.location.replace(window.location.origin+"/home.html");
          }
       
          console.log(response)
        }).catch(e=>{
          if(e.response){
            if(e.response.status===400){
                 window.alert("Wrong password or username");
        
            }
          }
          else if(e.request){
            console.log("not here")
            console.log(e);
            console.log(e.request);
          }
          else{
            console.log("check")
          }
        })
      })
    }
  }