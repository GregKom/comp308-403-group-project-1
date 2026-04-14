import { useMutation } from "@apollo/client";
import { DELETE_USER, UPDATE_USER } from "../graphql/mutations";
import { GET_CURRENT_USER } from "../graphql/queries";
import { useUser } from "../Hooks/useUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete"
import SendIcon from "@mui/icons-material/Send"

function UpdateAccount()
{
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const {user} = useUser();
    const [deleteUser] = useMutation(DELETE_USER, {
        refetchQueries: [GET_CURRENT_USER],
        awaitRefetchQueries: true,
    });

    const [updateUser] = useMutation(UPDATE_USER, {
        refetchQueries: [GET_CURRENT_USER],
        awaitRefetchQueries: true,
    })

    const [formData, setFormData] = useState({
        username: user?.username || "",
        password: "",
        email: user?.email || ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const input = {};
        if (formData.email.trim() !== "") input.email = formData.email;
        if (formData.username.trim() !== "") input.username = formData.username;
        if (formData.password.trim() !== "") input.password = formData.password;

        try {
            await updateUser({
                variables: {id: user.id, input: input}
            })

            setMessage("User Info Updated")

            setTimeout(() => {
                setMessage("");
            }, 1500)
        } catch (error)
        {
            console.error("Error Updating User: ", error)
            setMessage("Error Updating Account");
        }
    }

    const handleDelete = async () => {
        
        try {
           const { data } =  await deleteUser({
            variables: {id: user.id}}
        );

        setMessage(data.deleteUser);
        setTimeout(() => {
            navigate("/login");
        }, 1500)

        } catch (error)
        {
            console.error("Error Deleting User: ", error)
        }
    
    }
    return (
        <>
            <div class = "flex items-center justify-center ">
            <div class= "w-full max-w-lg bg-gradient-to-r from-blue-200 to-cyan-200 p-20 rounded-lg shadow-lg">
            <h1>Update Account</h1>

            <form onSubmit={handleSubmit}>
            <div class = "p-2">
                    <label><b>Username: </b></label><br/>
                    <TextField
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div class = "p-2">
                    <label><b>Email: </b></label><br/>
                    <TextField
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div class = "p-2">
                    <label><b>Password: </b></label><br/>
                    <TextField
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div class = "p-2">
                <Button type="submit" variant="contained" startIcon={<SendIcon />}>Update</Button>
                </div>
            </form>

            {message && <p>{message}</p>}
        

        <div>
            <Button onClick={handleDelete} variant="contained" color="error" startIcon={<DeleteIcon />} >Delete Account</Button>        
        </div>
        </div>
        </div>
        </>
    )
}

export default UpdateAccount;