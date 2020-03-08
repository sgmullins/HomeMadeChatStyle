import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import moment from 'moment';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

export default function Profile() {
  const context = useContext(AuthContext);
  const userId = context.user.id;
  const { loading, error, data } = useQuery(GET_CURRENT_USER_QUERY, {
    variables: {
      userId,
    },
  });
  if (loading) return <p>Loading User info</p>;
  if (error) return <p>Error fetching user info, {error}</p>;
  console.log('user data from profile query', data);

  console.log('from profile', context);
  console.log('from profile: id', userId);
  const { username, email, joinDate, favorites } = data.getCurrentUser;
  return (
    <div>
      <h1>{username}</h1>
      <h1>{email}</h1>
      <h1>{moment(joinDate).format('MMMM Do YYYY')}</h1>
      <h2>Favorites:</h2>
      {favorites.map(favorite => (
        <li key={favorite.id}>
          <Link to={`/meals/${favorite.id}`}>{favorite.title}</Link>
        </li>
      ))}
    </div>
  );
}

const GET_CURRENT_USER_QUERY = gql`
  query getCurrentUser($userId: ID!) {
    getCurrentUser(userId: $userId) {
      id
      username
      email
      joinDate
      favorites {
        id
        title
        category
      }
    }
  }
`;
