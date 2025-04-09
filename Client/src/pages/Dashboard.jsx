import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { counts } from '../utils/data';
import CountsCard from '../components/cards/CountsCard';
import WeeklyStat from '../components/cards/WeeklyStat';
import CategoryChart from '../components/cards/CategoryChart';
import AddWorkout from '../components/AddWorkout';
import WorkoutCard from '../components/cards/WorkoutCard';
import Button from '../components/Button';
import { addWorkout, getDashboardDetails, getWorkouts, getWorkoutSuggestion } from '../api';

const Container = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 22px 0px;
    overflow-y: scroll;
`;
const Wrapper = styled.div`
    flex: 1;
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    @media (max-width: 600px) {
        gap: 12px;
    }
`;
const Title = styled.div`
    padding: 0px 16px;
    font-size: 22px;
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
`;
const FlexWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 22px;
    padding: 0px 16px;
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

const Card = styled.div`
    flex: 1;
    max-width: 550px;
    padding: 24px;
    border: 1px solid ${({ theme }) => theme.text_primary + 20};
    border-radius: 14px;
    box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: ${({ theme }) => theme.bg};
    @media (max-width: 600px) {
        padding: 16px;
    }
`;
const SuggestionTitle = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) => theme.primary};
`;
const WorkoutText = styled.pre`
    font-family: 'Roboto Mono', monospace;
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_secondary};
    padding: 12px;
    border-radius: 10px;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 14px;
`;

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [todaysWorkouts, setTodaysWorkouts] = useState([]);
    const [workout, setWorkout] = useState(`#Legs\n    -Back Squat\n    -5 setsX15 reps\n    -30 kg\n    -10 min`);

    const [aiSuggestion, setAiSuggestion] = useState("");
    const [suggestionLoading, setSuggestionLoading] = useState(false);

    const dashboardData = async () => {
        setLoading(true);
        const token = localStorage.getItem("fittrack-app-token");
        await getDashboardDetails(token).then((res) => {
            setData(res.data);
            console.log(res.data);
            setLoading(false);
        });
    };
    const getTodaysWorkout = async () => {
        setLoading(true);
        const token = localStorage.getItem("fittrack-app-token");
        await getWorkouts(token, "").then((res) => {
            setTodaysWorkouts(res?.data?.todaysWorkouts);
            console.log(res.data);
            setLoading(false);
        });
    };

    const addNewWorkout = async () => {
        setButtonLoading(true);
        const token = localStorage.getItem("fittrack-app-token");
        await addWorkout(token, { workoutString: workout })
            .then((res) => {
                dashboardData();
                getTodaysWorkout();
                setButtonLoading(false);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const fetchWorkoutSuggestion= async () =>{
        try {
            setSuggestionLoading(true);
            const token = localStorage.getItem("fittrack-app-token");
            const res = await getWorkoutSuggestion(token);
            setAiSuggestion(res.data.suggestion);
            setSuggestionLoading(false);
        } catch (error) {
            console.error("Error fetching workout suggestion", error);
            setSuggestionLoading(false);
        }
    }

    useEffect(() => {
        dashboardData();
        getTodaysWorkout();
    }, []);

    return (
        <Container>
            <Wrapper>
                <Title>Dashboard</Title>
                <FlexWrap>
                    {counts.map((item, index) => (
                        <CountsCard key={item.key || index} item={item} data={data} />
                    ))}
                </FlexWrap>
                <FlexWrap>
                    <WeeklyStat data={data} />
                    <CategoryChart data={data} />
                    <AddWorkout
                        workout={workout}
                        setWorkout={setWorkout}
                        addNewWorkout={addNewWorkout}
                        buttonLoading={buttonLoading}
                    />
                </FlexWrap>

                <Section>
                    <Title>AI Workout Suggestion</Title>
                    <Card>
                        <SuggestionTitle>AI Workout Suggestion</SuggestionTitle>
                        <Button
                            text={suggestionLoading ? "Generating..." : "Get AI Workout Suggestion"}
                            
                            onClick={fetchWorkoutSuggestion}
                            isLoading={suggestionLoading}
                            isDisabled={suggestionLoading}
                        />
                        {aiSuggestion && (
                            <>
                                <WorkoutText>
                                    {aiSuggestion}
                                </WorkoutText>
                                <Button
                                    text="Use this Suggestion"
                                    onClick={() => setWorkout(aiSuggestion)}
                                />
                            </>
                        )}
                    </Card>
                </Section>

                <Section>
                    <Title>Today's Workouts</Title>
                    <CardWrapper>
                        {todaysWorkouts.map((workout) => (
                            <WorkoutCard key={workout._id} workout={workout} />
                        ))}
                    </CardWrapper>
                </Section>
            </Wrapper>
        </Container>
    )
}

export default Dashboard;
