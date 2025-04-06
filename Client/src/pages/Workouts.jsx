import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import WorkoutCard from '../components/cards/WorkoutCard';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { CircularProgress, CssBaseline } from '@mui/material';
import dayjs from 'dayjs';
import { getWorkouts } from '../api';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 0.2;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.palette.text.primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.palette.primary.main + 15};
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.primary.main};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Right = styled.div`
  flex: 1;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: 500;
`;

function Workouts({darkMode }) {
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976D2' },
      background: {
        default: darkMode ? '#121212' : '#f0f0f0',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
      },
    },
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      const token = localStorage.getItem("fittrack-app-token");
      try {
        const res = await getWorkouts(token, date ? `?date=${date}` : "");
        setTodaysWorkouts(res?.data?.todaysWorkouts || []);
      } catch (err) {
        console.error("Failed to fetch workouts:", err);
      }
      setLoading(false);
    };
    fetchWorkouts();
  }, [date]);

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Wrapper>
            <Left>
              <Title>Select Date</Title>
              
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  onChange={(e) => setDate(dayjs(e).format("MM/DD/YYYY"))}
                />
              </LocalizationProvider>
              
            </Left>
            <Right>
              <Section>
                <SecTitle>Workouts for {date || "today"}</SecTitle>
                {loading ? (
                  <CircularProgress />
                ) : todaysWorkouts.length === 0 ? (
                  <p style={{ color: theme.palette.text.primary }}>No workouts for this date.</p>
                ) : (
                  <CardWrapper>
                    {todaysWorkouts.map((workout, index) => (
                      <WorkoutCard key={workout._id || index} workout={workout} />
                    ))}
                  </CardWrapper>
                )}
              </Section>
            </Right>
          </Wrapper>
        </Container>
      </StyledThemeProvider>
      </ThemeProvider>
  );
}

export default Workouts;
