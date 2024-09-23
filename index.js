// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const localHost = "http://localhost:";
const apiBaseURL = "https://secrets-api.appbrewery.com/random";
const apiClient = axios.create({
    baseURL: apiBaseURL,
    timeout: 5000,
});


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await apiClient.get(apiBaseURL);
        const secret = response.data.secret;
        const user = response.data.username;
        res.render("index.ejs", { secret, user });
    } catch(error) {
        handleAxiosError(error, res);
    }
})

app.get("/next-secret", async (req, res) => {
    try {
        const response = await apiClient.get(apiBaseURL);
        const secret = response.data.secret;
        const user = response.data.username;
        res.json({ secret, user });
    } catch(error) {
        handleAxiosError(error, res);
    }
})

function handleAxiosError(error, res) {
    if (error.message) {
        res.status(error.response.status).send(`Error: ${error.response.statusText}`);
    } else if (error.request) {
        res.status(500).send("No response from the server");
    } else {
        res.status(500).send(`Error: ${error.message}`);
    }
}

app.listen(3000, () => {
    console.log(`Server running at ${localHost} ${port}`);
})