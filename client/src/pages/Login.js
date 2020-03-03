import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../utils/hooks';

function Login(props) {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    variables: values,
    update(cache, result) {
      console.log(result);
      props.history.push('/');
    },
    onError(err) {
      // console.log(err.graphQLErrors[0].extensions);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  //kind of hacky but needed because our useForm doesnt know about addUser and cant move it below useMutation because that needs values
  //the function word allows it to be hoisted because Javascript is hard
  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label='Username'
          type='text'
          placeholder='Enter username'
          name='username'
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
        />

        <Form.Input
          label='Password'
          type='password'
          placeholder='Select a Password'
          name='password'
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />

        <Button type='submit' primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      email
      username
      token
      joinDate
    }
  }
`;

export default Login;
