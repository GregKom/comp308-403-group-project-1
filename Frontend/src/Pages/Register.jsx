import { useState } from "react";
import {gql, useQuery, useMutation, useLazyQuery} from "@apollo/client"

const REGISTER = gql `
mutation RegisterUser($username: String!, $password: String!, $email: String!)
{
    registerUser(username: $username, password: $password, email: $email)
    {
        id
        username
        email
    }
}
`

function Register()
{
    const [registerUser, {loading: registering, error: addError}] = useMutation(REGISTER);

    //use states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmitRegisterUser = async (e) => {
        e.preventDefault();

        await registerUser({variables: {username: username, password: password, email: email}});
        
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmitRegisterUser}>
                <label>
                    Username:
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label>
                    Email:
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>    
                <button type="submit">Register</button>                            
            </form>
        </div>
    )
}

export default Register;