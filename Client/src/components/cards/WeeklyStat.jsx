import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const Card = styled.div`
    flex: 1;
    min-width: 280px;
    padding: 24px;
    border: 1px solid ${({ theme }) => theme.text_primary + 20};
    border-radius: 14px;
    box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
    display: flex;
    flex-direction: column;
    gap: 6px;
    @media (max-width: 600px) {
        padding: 16px;
    }
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) => theme.primary};
    @media (max-width: 600px) {
        font-size: 14px;
    }
`;

function WeeklyStat({ data }) {
    const theme = useTheme(); // ✅ access current theme

    return (
        <Card>
            <Title>Weekly Calories Burned</Title>
            {data?.totalWeeksCaloriesBurnt && (
                <BarChart
                    xAxis={[
                        {
                            scaleType: "band",
                            data: data?.totalWeeksCaloriesBurnt?.weeks,
                            tickLabelStyle: { fill: theme.text_primary }
                        },
                    ]}
                    series={[
                        {
                            data: data?.totalWeeksCaloriesBurnt?.caloriesBurned,
                            color: theme.primary, // ✅ chart bar color
                        },
                    ]}
                    yAxis={[{
                        tickLabelStyle: { fill: theme.text_primary },
                    }]}
                    grid={{ vertical: true, horizontal: true }}
                    height={300}
                    sx={{
                        backgroundColor: theme.card, // ✅ card background
                        padding: 2,
                        borderRadius: 2,
                        "& .MuiChartsLegend-root": {
                            color: theme.text_primary
                        }
                    }}
                />
            )}
        </Card>
    );
}

export default WeeklyStat;
