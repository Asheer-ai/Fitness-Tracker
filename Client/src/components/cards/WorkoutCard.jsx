import { FitnessCenterRounded, TimelapseRounded } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 16px 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 600px) {
    padding: 12px 14px;
  }
`;

const Category = styled.div`
  width: fit-content;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  background: ${({ theme }) => theme.primary + 20};
  padding: 4px 10px;
  border-radius: 8px;
`;

const Name = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Sets = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
`;

const Flex = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const Details = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const WorkoutCard = ({ workout }) => {
  return (
    <Card>
      <Category>#{workout?.category || 'Category'}</Category>
      <Name>{workout?.workoutName || 'Workout Name'}</Name>
      <Sets>
        Count: {workout?.sets || 0} sets × {workout?.reps || 0} reps
      </Sets>
      <Flex>
        <Details>
          <FitnessCenterRounded sx={{ fontSize: '20px' }} />
          {workout?.weight || 0} kg
        </Details>
        <Details>
          <TimelapseRounded sx={{ fontSize: '20px' }} />
          {workout?.duration || 0} min
        </Details>
      </Flex>
    </Card>
  );
};

export default WorkoutCard;
