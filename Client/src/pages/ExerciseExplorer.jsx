import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 22px 0;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0 20px; /* Add padding to left and right */

  @media (max-width: 768px) {
    padding: 0 16px; /* Slightly smaller padding for tablets */
  }

  @media (max-width: 480px) {
    padding: 0 12px; /* Smaller padding for mobile */
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 480px) {
    gap: 16px; /* Slightly tighter spacing on very small screens */
  }
  `;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 16px;
  background: #fff;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.h3`
  margin: 10px 0;
  font-size: 18px;
  color: #333;
`;

const Meta = styled.p`
  font-size: 14px;
  color: #666;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 30px 0 60px;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  background-color: ${({ $active }) => ($active ? '#007bff' : '#eee')};
  color: ${({ $active }) => ($active ? '#fff' : '#333')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ExerciseExplorer = () => {
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = 10; // You can change this if API provides total count

  const fetchExercises = async (page = 1) => {
    const offset = (page - 1) * itemsPerPage;

    try {
      const response = await fetch(
        `https://exercisedb.p.rapidapi.com/exercises?offset=${offset}&limit=${itemsPerPage}`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'b267518c03msh03fbc6fb319fd37p14e9e2jsn39ef3b112d21',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        }
      );
      const data = await response.json();
      setExercises(data);
    } catch (err) {
      console.error('Error fetching exercises:', err);
      setExercises([]);
    }
  };

  useEffect(() => {
    fetchExercises(currentPage);
  }, []);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchExercises(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Grid>
          {exercises.map((exercise, index) => (
            <Card key={index}>
              <Image src={exercise.gifUrl} alt={exercise.name} />
              <Title>{exercise.name}</Title>
              <Meta><strong>Target:</strong> {exercise.target}</Meta>
              <Meta><strong>Equipment:</strong> {exercise.equipment}</Meta>
            </Card>
          ))}
        </Grid>

        <Pagination>
          <PageButton onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </PageButton>

          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index}
              $active={currentPage === index + 1}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}

          <PageButton onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </PageButton>
        </Pagination>
      </Wrapper>
    </Container>
  );
};

export default ExerciseExplorer;
