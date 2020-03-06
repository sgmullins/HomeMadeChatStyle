import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import MealCard from '../components/MealCard';
import MealCreationForm from '../components/MealCreationForm';
import { FETCH_MEALS_QUERY } from '../utils/graphqlQueries';

function Home() {
  const context = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_MEALS_QUERY);
  if (loading) return <p>Loading meals...</p>;
  const meals = data.getAllMeals;
  return (
    <Grid columns={3}>
      <Grid.Row id='page-title'>
        <h1>Featured Meals</h1>
      </Grid.Row>
      <Grid.Row>
        {context.user && (
          <Grid.Column>
            <MealCreationForm />
          </Grid.Column>
        )}
        {/* semantic fade in effect */}
        <Transition.Group>
          {meals &&
            meals.map(meal => (
              <Grid.Column key={meal.id} style={{ marginBottom: 20 }}>
                <MealCard meal={meal} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
