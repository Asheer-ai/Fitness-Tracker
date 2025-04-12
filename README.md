# 💪 TrackFitPro - AI Fitness Tracker App

TrackFitPro is a full-stack fitness tracker web application that helps users log their workouts, track progress, and visualize stats — all in a clean, responsive UI with support for light and dark themes. It also integrates AI-generated workout suggestions to optimize training.

---

## 🚀 Live Demo

[TrackFitPro Live Demo 🚀](https://fittrackpro-2.netlify.app/)

---

## 🚀 Features

### ✅ Authentication
- Login/Register functionality (handled on frontend via `Authentication.jsx`)
- Conditional rendering of pages based on user authentication using Redux

### 🎨 Theme Support
- Toggle between **light** and **dark** modes
- Themes managed using `styled-components`
- Dynamic color changes for all components and MUI elements (like calendar)

### 🏠 Dashboard
- Shows key metrics like total workouts, total calories, total duration, etc.
- Components:
  - `CountsCard`: Stat cards for quick overview
  - `WeeklyStat`: Line/Bar chart for weekly workout insights
  - `CategoryChart`: Visualization of workout categories
  - `AddWorkout`: Quick-add workout input box
  - `WorkoutCard`: Displays today's workouts

### 📆 Workout Log
- Displays workouts by date using an interactive calendar (MUI `DateCalendar`)
- Fully responsive
- Highlights:
  - Uses `dayjs` for date formatting
  - Custom styles for calendar days (black/white text based on theme)
  - Fetches and displays workouts for selected date

### 🤖 AI Workout Suggestion
- Integrated with Gemini API for generating personalized workout plans
- Users get suggestions based on preferences or routines
- Accessible from the dashboard

### 🔐 Token-Based Authentication
- Uses tokens from `localStorage` for protected API routes
- API Functions:
  - `getDashboardDetails`
  - `getWorkouts`
  - `addWorkout`

---

## 🛠 Tech Stack

### Frontend:
- **React.js**
- **Redux Toolkit**
- **React Router DOM**
- **Styled-Components**
- **Material UI (MUI)**
- **Day.js**

### Backend:
- **Node.js + Express** (API routes like `getWorkouts`, `addWorkout`, etc.)
- **Gemini API** for AI workout generation

---

## 📁 Folder Structure
<pre lang="markdown">
trackFitPro/
├─ Client/
│  ├─ public/
│  │  ├─ AuthImage.jpg
│  │  ├─ Logo.png
│  │  └─ vite.svg
│  ├─ src/
│  │  ├─ api/
│  │  │  └─ index.js
│  │  ├─ assets/
│  │  │  └─ react.svg
│  │  ├─ components/
│  │  │  ├─ cards/
│  │  │  │  ├─ CategoryChart.jsx
│  │  │  │  ├─ CountsCard.jsx
│  │  │  │  ├─ WeeklyStat.jsx
│  │  │  │  └─ WorkoutCard.jsx
│  │  │  ├─ AddWorkout.jsx
│  │  │  ├─ Button.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ SignIn.jsx
│  │  │  ├─ SignUp.jsx
│  │  │  └─ TextInput.jsx
│  │  ├─ pages/
│  │  │  ├─ Authentication.jsx
│  │  │  ├─ Contact.jsx
│  │  │  ├─ Dashboard.jsx
│  │  │  ├─ ExerciseExplorer.jsx
│  │  │  └─ Workouts.jsx
│  │  ├─ redux/
│  │  │  ├─ reducers/
│  │  │  │  └─ userSlice.js
│  │  │  └─ store.js
│  │  ├─ utils/
│  │  │  ├─ Images/
│  │  │  │  ├─ AuthImage.jpg
│  │  │  │  └─ Logo.png
│  │  │  ├─ data.jsx
│  │  │  └─ Themes.js
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ .gitignore
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  └─ vite.config.js
├─ Server/
│  ├─ controllers/
│  │  ├─ getWorkoutSuggestion.js
│  │  └─ UserController.js
│  ├─ Middleware/
│  │  └─ verifyToken.js
│  ├─ models/
│  │  ├─ User.js
│  │  └─ Workout.js
│  ├─ routes/
│  │  └─ UserRoute.js
│  ├─ .env
│  ├─ .gitignore
│  ├─ error.js
│  ├─ index.js
│  ├─ package-lock.json
│  └─ package.json
└─ README.md
</pre>

## 📸 Screenshots

### 🔐 Login Page
![Login Screenshot](https://github.com/Asheer-ai/Fitness-Tracker/blob/41d8db78e13de9b58e5943db50fd4f0091736e9c/Screenshot%202025-04-12%20153813.png)

### 🏠 Dashboard
![Dashboard Screenshot1](https://github.com/Asheer-ai/Fitness-Tracker/blob/5912bd4ef3ec8830fa378dc390ef284577993c2e/Screenshot%202025-04-12%20153134.png) 
![Dashboard Screenshot2](https://github.com/Asheer-ai/Fitness-Tracker/blob/5912bd4ef3ec8830fa378dc390ef284577993c2e/Screenshot%202025-04-12%20153206.png)
## Dark mode
![Dashboard Screenshot3](https://github.com/Asheer-ai/Fitness-Tracker/blob/66830d16ab8306d035f1e4fa7887241d7e4e9ad2/Screenshot%202025-04-12%20153225.png)
![Dashboard Screenshot4](https://github.com/Asheer-ai/Fitness-Tracker/blob/66830d16ab8306d035f1e4fa7887241d7e4e9ad2/Screenshot%202025-04-12%20153237.png)

### 📆 Workout Calendar
![Calendar Screenshot](https://github.com/Asheer-ai/Fitness-Tracker/blob/fb4922d61474e29a0bb7943446965f70b9cd7531/Screenshot%202025-04-12%20153250.png)

### 👨‍🏫 Tutorials
![Tutorials Screenshot](https://github.com/Asheer-ai/Fitness-Tracker/blob/66830d16ab8306d035f1e4fa7887241d7e4e9ad2/Screenshot%202025-04-12%20153306.png)
![Tutorials Screenshot2](https://github.com/Asheer-ai/Fitness-Tracker/blob/66830d16ab8306d035f1e4fa7887241d7e4e9ad2/Screenshot%202025-04-12%20153317.png)


### 📞Contact Us
![Contact Us](https://github.com/Asheer-ai/Fitness-Tracker/blob/3c4da820710590a4801394df3080d9af7ed606cc/Screenshot%202025-04-12%20153331.png) 
