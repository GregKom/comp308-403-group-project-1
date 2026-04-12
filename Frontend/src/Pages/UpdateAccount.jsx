import { useMutation } from "@apollo/client";
import { DELETE_USER, UPDATE_USER } from "../graphql/mutations";
import { GET_CURRENT_USER } from "../graphql/queries";
import { useUser } from "../Hooks/useUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        password: user?.email || "",
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
                <div>
            <h1>Update Account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update</button>
            </form>

            {message && <p>{message}</p>}
        </div>

        <div>
            <button onClick={handleDelete}>Delete Account</button>        
        </div>
        </>
    )
}

export default UpdateAccount;