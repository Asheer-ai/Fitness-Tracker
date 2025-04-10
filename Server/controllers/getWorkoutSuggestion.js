import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import User from "../models/User.js";
import { createError } from "../error.js";
import Workout from "../models/Workout.js";

dotenv.config();

const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const getWorkoutSuggestion = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const user = await User.findById(userId);
        if (!user) return next(createError(404, "User not found"));

        const recentWorkouts = await Workout.find({ user: userId }).sort({ date: -1 }).limit(5);

        if (recentWorkouts.length === 0) {
            return res.status(200).json({
                suggestion: `You don't have any workout history yet. Here's a basic beginner plan:

            #Full Body
            - Bodyweight Squats
            - 3 sets 15 reps
            - 0 kg
            - 5 min

            #Cardio
            - Brisk Walking
            - 1 set 20 min
            - 0 kg
            - 20 min`
            });
        }

        const formattedWorkouts = recentWorkouts.map(w => {
            return `Category: ${w.category}, Name: ${w.workoutName}, Duration: ${w.duration}min, Sets: ${w.sets}, Reps: ${w.reps}, Weight: ${w.weight}kg`;
        }).join("\n");
        // Get the most recent workout (last one)
        const previousLine = formattedWorkouts.split('\n').slice(-1)[0];
        console.log("recent workout",previousLine)

        // Extract category only (to prefix with #)
        const category = previousLine.split(',')[0].split(':')[1].trim();
        console.log("previous category",category)

        const workoutNames = recentWorkouts.map(w => w.workoutName).join(", ");
        console.log("all workout names",workoutNames)

        const prompt = `
        You are a strict workout assistant.

        The user did this workout previously:
        ${previousLine}

        Now generate ONE **new** workout that:
        - Belongs ONLY to the *same* muscle category: "${category}"
        - Is not a repeat
        -Exclude previous workouts: ${workoutNames}
        - Follow this **exact format** with 5 lines:

        #${category}  
        -Workout Name  
        -x setsXy reps  
        -z kg or Bodyweight  
        -d min

        ⚠️ Return **only one workout**, no explanations or intros. Keep it short and clean.
        `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const suggestion = response.text();

        res.status(200).json({ suggestion });
    } catch (error) {
        console.error("Error generating workout suggestion:", error);
        next(error);
    }
};