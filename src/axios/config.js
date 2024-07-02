import axios from "axios";

const projet1Api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
})

export default projet1Api;