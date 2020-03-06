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
