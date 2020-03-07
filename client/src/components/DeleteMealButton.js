import React, { useState } from 'react';
import { Icon, Button, Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FETCH_MEALS_QUERY } from '../utils/graphqlQueries';
import PopupUtil from '../utils/PopupUtil';

function DeleteMealButton({ mealId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_MEAL_MUTATION;

  const [deleteMealorComment] = useMutation(mutation, {
    variables: {
      mealId,
      commentId,
    },
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_MEALS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_MEALS_QUERY,
          data: {
            getAllMeals: data.getAllMeals.filter(m => m.id !== mealId),
          },
        });
      }
      if (callback) callback();
    },
  });

  return (
    <>
      <PopupUtil content={commentId ? 'Delete Comment' : 'Delete Meal'}>
        <Button
          as='div'
          color='red'
          onClick={() => setConfirmOpen(true)}
          floated='right'
        >
          <Icon name='trash' style={{ margin: 0 }} />
        </Button>
      </PopupUtil>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteMealorComment}
      />
    </>
  );
}

const DELETE_MEAL_MUTATION = gql`
  mutation deleteMeal($mealId: ID!) {
    deleteMeal(mealId: $mealId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($mealId: ID!, $commentId: ID!) {
    deleteComment(mealId: $mealId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteMealButton;
