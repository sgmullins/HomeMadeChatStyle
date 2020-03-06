import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { FETCH_MEALS_QUERY } from '../utils/graphqlQueries';

function MealCreationForm() {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(createMealCallback, {
    title: '',
    category: '',
    description: '',
    amount: 1,
  });

  const resetValues = () => {
    values.title = '';
    values.category = '';
    values.description = '';
    values.amount = 1;
  };

  const [createMeal] = useMutation(CREATE_MEAL_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_MEALS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_MEALS_QUERY,
        data: {
          getAllMeals: [result.data.createMeal, ...data.getAllMeals],
        },
      });
      resetValues();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function createMealCallback() {
    createMeal();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Post a Meal:</h2>
        <Form.Field>
          <Form.Input
            onChange={onChange}
            placeholder='title'
            name='title'
            value={values.title}
          />
          <Form.Input
            onChange={onChange}
            placeholder='category'
            name='category'
            value={values.category}
          />
          <Form.Input
            onChange={onChange}
            placeholder='description'
            name='description'
            value={values.description}
          />
          <Form.Input
            type='number'
            onChange={onChange}
            placeholder='amount'
            name='amount'
            value={values.amount}
          />
          <Button type='submit' color='teal'>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message' style={{ marginBottom: 15 }}>
          <ul className='list'>
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
const CREATE_MEAL_MUTATION = gql`
  mutation createMeal(
    $title: String!
    $category: String!
    $description: String!
    $amount: Int!
  ) {
    createMeal(
      mealInput: {
        title: $title
        category: $category
        description: $description
        amount: $amount
      }
    ) {
      id
      title
      category
      description
      username
      amount
      madeDate
      comments {
        id
        username
        body
      }
      commentCount
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

export default MealCreationForm;
