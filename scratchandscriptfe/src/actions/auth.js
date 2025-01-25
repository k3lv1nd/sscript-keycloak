import axios from "axios";


export const introspectUser = ({username, email}) => {
    //Hits the register endpoint and adds a user if not exists
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({ username, email });


    axios.post('http://localhost:8000/api/auth/register', body, config)
        .then(res => {
            console.log(res.data)
        })
        .catch (err => {
           // console.log(err.response.data)
        });
};
