import React, { useContext, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  ADD_COMMENT_MUTATION,
  FETCH_MEAL_QUERY,
} from '../utils/graphqlQueries';
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Form,
} from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteMealButton from '../components/DeleteMealButton';
import PurchaseMealButton from '../components/PurchaseMealButton';
import PopupUtil from '../utils/PopupUtil';

export default function SingleMeal(props) {
  const { user } = useContext(AuthContext);
  const mealId = props.match.params.mealId;
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');
  const [createComment] = useMutation(ADD_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      mealId,
      body: comment,
    },
  });
  const { loading, error, data } = useQuery(FETCH_MEAL_QUERY, {
    variables: {
      mealId,
    },
  });
  if (loading) return <p>Loading Meal...</p>;
  if (error) return <p>Error fetching meal, {error}</p>;

  function deleteMealCallback() {
    props.history.push('/');
  }
  let mealMarkup;
  if (!data.getMeal) {
    mealMarkup = <p>Loading Meal...</p>;
  } else {
    const {
      id,
      title,
      category,
      description,
      username,
      madeDate,
      likeCount,
      commentCount,
      amount,
      likes,
      comments,
    } = data.getMeal;

    mealMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              size='small'
              float='right'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>{category}</Card.Meta>
                <Card.Meta>{moment(madeDate).fromNow()}</Card.Meta>
                <Card.Description>{description}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} meal={{ id, likeCount, likes }} />
                <PopupUtil content='Comment on Meal'>
                  <Button
                    as='div'
                    labelPosition='right'
                    onClick={() => console.log('comment on meal')}
                  >
                    <Button basic color='blue'>
                      <Icon name='comments' style={{ fontSize: '20px' }} />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                      {commentCount}
                    </Label>
                  </Button>
                </PopupUtil>
                {user && user.username === username && (
                  <DeleteMealButton mealId={id} callback={deleteMealCallback} />
                )}
                {user && user.username !== username && (
                  <PurchaseMealButton mealData={data.getMeal} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Add a comment</p>
                  <Form>
                    <div className='ui action input fluid'>
                      <input
                        type='text'
                        placeholder='Comment...'
                        name='comment'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type='submit'
                        className='ui button teal'
                        disabled={comment.trim('') === ''}
                        onClick={createComment}
                      >
                        Add
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map(comment => (
              //TODO: refactor into a card component
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteMealButton mealId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return mealMarkup;
}

// const FETCH_MEAL_QUERY = gql`
//   query getMeal($mealId: ID!) {
//     getMeal(mealId: $mealId) {
//       id
//       title
//       category
//       description
//       username
//       madeDate
//       likeCount
//       commentCount
//       amount
//       likes {
//         username
//       }
//       comments {
//         id
//         username
//         createdAt
//         body
//       }
//     }
//   }
// `;

// const ADD_COMMENT_MUTATION = gql`
//   mutation createComment($mealId: ID!, $body: String!) {
//     createComment(mealId: $mealId, body: $body) {
//       id
//       comments {
//         id
//         body
//         createdAt
//         username
//       }
//       commentCount
//     }
//   }
// `;
