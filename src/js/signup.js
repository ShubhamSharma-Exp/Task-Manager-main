 import axios from 'axios';
 const signUp = document.querySelector('.boxSignUp');
       
        signUp.addEventListener("submit", (e) => {
            e.preventDefault();
            if (signUp.elements[2].value === signUp.elements[3].value) {

                axios.post('https://cors-anywhere.herokuapp.com/task-leet1337.herokuapp.com/users', {
                    name: signUp.elements[0].value,
                    email: signUp.elements[1].value,
                    password: signUp.elements[2].value

                }).then((response) => {
                    if (response.status === 201) {
                        window.alert("Success");
                    }
                }).catch(e => {
                    console.log(e);
                })
            }
            else {
                window.alert("Password Not Matched")
            }

        })