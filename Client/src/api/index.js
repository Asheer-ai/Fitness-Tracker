import axios from "axios";

const API = axios.create({
    baseURL: "https://trackfitpro-api.onrender.com/api/",
});

export const UserSignUp = async (data) =>
    await API.post("/user/signup", data);

export const UserSignIn = async (data) =>
    await API.post("/user/signin", data);

export const getDashboardDetails = async (token) =>
    await API.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
    });

export const getWorkouts = async (token, date) =>
    await API.get(`/user/workout?date=${date}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const addWorkout = async (token, data) =>
    await API.post(`/user/workout`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const getWorkoutSuggestion = async (token) =>
        await API.post("/user/suggest-workout", {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    