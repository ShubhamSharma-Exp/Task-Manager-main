import axios from 'axios';

const token=localStorage.getItem('token');
const apiUrl='http://localhost:3000'

axios.interceptors.request.use(
    config => {
        config.headers.authorization=`Bearer ${token}`;
        return config;
    },
    error=>{
        return Promise.reject(error);
    }
);

  

    const fetchData=async ()=>{
        try{
            console.log("hey");
             const result= await axios.get(apiUrl+"/users/me");
            return result;
           
        }
        catch{
                console.log("hey");
                
    }
}
const logOut=async ()=>{
    try{
        const loggedOut=await axios.post(apiUrl+"/users/logout");
        localStorage.removeItem('token');
        return loggedOut.status;
    }
    catch{
            console.log("hey");
    }
}
export {fetchData,logOut};

 