import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_GAME } from "../graphql/mutations";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";

import { GET_MY_GAMES } from "../graphql/queries";

function AddGame() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    description: "",
    status: "Backlog",
    rating: "",
    releaseDate: "",
    imageUrl: "",
  });

  const [addGame] = useMutation(ADD_GAME, {
    onCompleted: () => {
      setMessage("Game Added Successfully!");

      setTimeout(() => {
        setMessage("");
        navigate("/games");
      }, 1500);
    },
    onError: (error) => {
      console.error("Error Adding Game:", error.message);
      setMessage(`Failed to add game: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const input = {};

    if (formData.title.trim() !== "") input.title = formData.title;
    if (formData.platform.trim() !== "") input.platform = formData.platform;
    if (formData.description.trim() !== "") input.description = formData.description;
    if (formData.status.trim() !== "") input.status = formData.status;
    if (formData.rating !== "") input.rating = parseInt(formData.rating, 10);
    if (formData.releaseDate.trim() !== "") input.releaseDate = formData.releaseDate;
    if (formData.imageUrl.trim() !== "") input.imageUrl = formData.imageUrl;

    await addGame({
      variables: { input },
      refetchQueries: [{query: GET_MY_GAMES}]
    });
  };

  return (
    <>
    
        <h1>Add A Game</h1>
        <div class = "flex items-center justify-center">
        <div class= "w-full max-w-lg bg-gradient-to-r from-blue-200 to-cyan-200 p-20 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
            <label ><b>Title: </b></label><br/>
            <TextField
              type="text"
              name="title"
              placeholder="Enter title here"
              value={formData.title}
              onChange={handleChange}
            />

          <div class = "p-2">
            <label><b>Platform: </b></label><br/>
            <TextField
              type="text"
              name="platform"
              placeholder="Enter platform here"
              value={formData.platform}
              onChange={handleChange}
            />
          </div>

          <div class = "p-2">
            <label><b>Description: </b></label><br/>
            <TextField
              type="text"
              name="description"
              placeholder="The game is a....."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div class = "p-2">
            <label><b>Status: </b></label><br/>
            <Select
              name="status"
              value={formData.status}
              
              onChange={handleChange}
            >
              <MenuItem value="Playing">Playing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Backlog">Backlog</MenuItem>
              <MenuItem value="Re-playing">Re-playing</MenuItem>
            </Select>
          </div>

          <div class = "p-2">
            <label><b>Rating (0-10):</b></label><br/>
            <Rating 
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              max={10}
            />
          </div>

          <div class = "p-2">
            <label><b>Release Date: </b></label><br/>
            <TextField
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
            />
          </div>

          <div class = "p-2">
            <label><b>Image URL: </b></label><br/>
            <TextField
              type="text"
              name="imageUrl"
              placeholder="Enter url here"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div class = "p-5">
            <Button variant = "contained" type="submit">Add Game</Button>
          </div>

          {message && <p>{message}</p>}
        </form>
      </div>
      </div>
    </>
  );
}

export default AddGame;