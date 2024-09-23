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