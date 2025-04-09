import {ThemeProvider,styled} from "styled-components"
import './App.css'
import { lightTheme,darkTheme } from "./utils/Themes"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Authentication from "./pages/Authentication";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import { useSelector } from "react-redux";
import Contact from "./pages/Contact";
import ExerciseExplorer from "./pages/ExerciseExplorer";

const Container=styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;`;

function App() {

  const { currentUser }=useSelector((state)=>state.user)
  const [darkMode, setDarkMode] = useState(false); 
  const toggleTheme = () => setDarkMode((prev) => !prev);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <BrowserRouter>
      {currentUser ? (<Container>
        <Navbar 
        currentUser={currentUser}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
        />
        <Routes>
          <Route path="/"  element={<Dashboard/>}/>
          <Route path="/workouts" element={<Workouts darkMode={darkMode} />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/tutorials" element={<ExerciseExplorer/>}/>
        </Routes>
        </Container>):(
      <Container><Authentication/></Container>
      )}
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
