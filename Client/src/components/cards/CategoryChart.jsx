import React from 'react'
import styled from 'styled-components';
import { PieChart } from '@mui/x-charts/PieChart';
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


function CategoryChart({ data }) {
    const transformedData = data?.totalWeeksCaloriesBurnt?.caloriesBurned?.map((calories, index) => ({
        id: index,
        label: data.totalWeeksCaloriesBurnt.weeks[index] || `Week ${index + 1}`,
        value: calories,
    }));

    return (
        <Card>
            <Title>Weekly Calories Burned</Title>
            {transformedData?.length > 0 ? (
                <PieChart
                    series={[{
                        data: transformedData,
                        innerRadius: 30,
                        outerRadius: 120,
                        paddingAngle: 5,
                        cornerRadius: 5,
                    }]}
                    height={300}
                />
            ) : (
                <p>No data available</p>
            )}
        </Card>
    );
}


export default CategoryChart