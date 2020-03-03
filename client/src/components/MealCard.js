import React from 'react';
import { Card, Image, Icon, Label, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function MealCard({
  meal: {
    id,
    title,
    category,
    description,
    username,
    amount,
    madeDate,
    likeCount,
    commentCount,
    likes,
  },
}) {
  const likePost = () => {
    console.log('like post');
  };
  const commentOnMeal = () => {
    console.log('comment');
  };

  return (
    <Card fluid>
      <Card.Content as={Link} to={`/meals/${id}`}>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />

        <Card.Header>{title}</Card.Header>
        <Card.Meta>{moment(madeDate).fromNow()}</Card.Meta>
        <Card.Meta>{`Great for: ${category}`}</Card.Meta>
        <Card.Meta>MadeBy: {username}</Card.Meta>
        <Card.Description>
          <p>{description}</p>
          <p>Amount: {amount}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='red' basic>
            <Icon name='heart' style={{ fontSize: '20px' }} />
          </Button>
          <Label basic color='red' pointing='left'>
            {likeCount}
          </Label>
        </Button>
        <Button as='div' labelPosition='right' onClick={commentOnMeal}>
          <Button color='blue' basic>
            <Icon name='comments' style={{ fontSize: '20px' }} />
          </Button>
          <Label basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        {/* <Button as='div' labelPosition='left' floated='right'>
          <Label basic color='green' pointing='right'>
            Buy
          </Label>
          <Button color='green' basic>
            <Icon name='shopping basket' style={{ fontSize: '20px' }} />
          </Button>
        </Button> */}
      </Card.Content>
    </Card>
  );
}

export default MealCard;
