import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';
import MealCard from '../components/MealCard';

function Home() {
  const { loading, data } = useQuery(FETCH_MEALS_QUERY);
  if (loading) return <p>Loading</p>;
  const meals = data.getAllMeals;
  return (
    <Grid columns={3}>
      <Grid.Row id='page-title'>
        <h1>Featured Meals</h1>
      </Grid.Row>
      <Grid.Row>
        {meals &&
          meals.map(meal => (
            <Grid.Column key={meal.id} style={{ marginBottom: 20 }}>
              <MealCard meal={meal} />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_MEALS_QUERY = gql`
  {
    getAllMeals {
      id
      title
      category
      description
      username
      madeDate
      likeCount
      commentCount
      amount
      likes {
        username
      }
      comments {
        id
        username
        body
      }
    }
  }
`;

export default Home;
