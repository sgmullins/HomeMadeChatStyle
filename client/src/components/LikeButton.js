import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Icon, Label, Button } from 'semantic-ui-react';
import PopupUtil from '../utils/PopupUtil';
import { GET_CURRENT_USER_QUERY } from '../utils/graphqlQueries';

function LikeButton({ user, meal: { likeCount, likes, id, username } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes, username]);

  const [likeMeal] = useMutation(LIKE_MEAL_MUTATION, {
    variables: { mealId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color='red'>
        <Icon name='heart' style={{ fontSize: '20px' }} />
      </Button>
    ) : (
      <Button color='red' basic>
        <Icon name='heart' style={{ fontSize: '20px' }} />
      </Button>
    )
  ) : (
    <Button as={Link} to='/login' color='red' basic>
      <Icon name='heart' style={{ fontSize: '20px' }} />
    </Button>
  );
  return (
    <Button as='div' labelPosition='right' onClick={likeMeal}>
      <PopupUtil content={liked ? 'Unlike' : 'Like'}>{likeButton}</PopupUtil>
      <Label basic color='red' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_MEAL_MUTATION = gql`
  mutation likeMeal($mealId: ID!) {
    likeMeal(mealId: $mealId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
