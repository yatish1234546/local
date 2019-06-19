import { findUser } from '@/api/mock/data/mock-users';
import jwt from 'jwt-simple';

const secret = 'dummy-secret';

function generateToken(user) {
  const payload = {
    sub: user.userName,
    auth: user.roles.join(','),
  };

  return jwt.encode(payload, secret);
}

export default function authenticate(username, password) {
  const user = findUser(username);
  let response = {
    statusCode: '404',
    statusMessage: 'User not found',
  };

  if (user) {
    const token = generateToken(user);

    response = {
      statusCode: '200',
      statusMessage: 'User found',
      headers: {
        authorization: token, // generate something random
      },
      data: {
        id_token: token,
      },
    };

    return new Promise((resolve, reject) => {
      resolve(response);
    });
  }

  return new Promise((resolve, reject) => {
    reject(response);
  });
}
