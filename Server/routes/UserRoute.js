import express from "express";
import { addWorkout, getUserDashboard, getWorkoutByDate, UserLogin, UserRegister } from "../controllers/UserController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { getWorkoutSuggestion } from "../controllers/getWorkoutSuggestion.js";

const router = express.Router();


router.post("/signup",UserRegister)
router.post("/signin",UserLogin)
router.get("/dashboard",verifyToken,getUserDashboard);
router.get("/workout",verifyToken,getWorkoutByDate);
router.post("/workout",verifyToken,addWorkout);
router.post("/suggest-workout", verifyToken, getWorkoutSuggestion);

export default router;