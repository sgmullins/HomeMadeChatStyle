import React, { useContext } from 'react';

import { AuthContext } from '../context/auth';

export default function Profile() {
  const context = useContext(AuthContext);
  console.log(context);
  return (
    <div>
      <h1>{context.user.username}</h1>
      <h1>{context.user.email}</h1>

      <h1>{context.user.joinDate}</h1>
    </div>
  );
}
