import gql from 'graphql-tag';

export const FETCH_MEALS_QUERY = gql`
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

export const FETCH_MEAL_QUERY = gql`
  query getMeal($mealId: ID!) {
    getMeal(mealId: $mealId) {
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
        createdAt
        body
      }
    }
  }
`;

export const ADD_COMMENT_MUTATION = gql`
  mutation createComment($mealId: ID!, $body: String!) {
    createComment(mealId: $mealId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;
