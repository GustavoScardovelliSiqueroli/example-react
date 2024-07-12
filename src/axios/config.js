import axios from "axios";

const projet1Api = axios.create({
    baseURL: "http://192.168.0.111",
    headers: {
        "Content-Type": "application/json",
    },
})

export default projet1Api;