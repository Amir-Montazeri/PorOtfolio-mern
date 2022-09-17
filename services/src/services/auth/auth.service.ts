import fs from 'fs';
import jwt from 'jsonwebtoken';
import { ReturnedRegisterUserType } from 'src/../../entities/src/user';

import {
  UserAccountType,
  UserWithOutPasswordType,
} from '../../../../entities/src';

const getUsers: () => UserAccountType[] = () => {
  let usersAsString = fs.readFileSync(
    './src/data/users.json'
  ) as unknown as string;
  let parsedUsers = JSON.parse(usersAsString);
  return parsedUsers;
};

const usernameIsExist: (email: string) => Boolean = (email) => {
  const users = getUsers();
  const userExist = users.some((user) => user.email === email);
  return userExist;
};

const jwtTokenChecker = (token: string): UserAccountType | false => {
  let result: UserAccountType | false = false;
  const verify = jwt.verify(token, 'secret') as {
    exp: number;
    data: string;
    iat: number;
  };

  if (verify) {
    const users = getUsers();
    result = users.filter((user) => user.email === verify.data)[0];
  }

  return result;
};

export const registerUser = (email: string, password: string) => {
  let result: ReturnedRegisterUserType = { status: 'loading' };
  if (usernameIsExist(email)) {
    result = { status: 'user already exist' };
  } else {
    const role: 'user' | 'admin' =
      email === 'm3amir88@yahoo.com' ? 'admin' : 'user';
    const users = getUsers();

    let token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: email,
      },
      'secret'
    );

    let data = JSON.stringify(
      [
        ...users,
        {
          email,
          password,
          role,
          token: token,
        },
      ],
      null,
      2
    );
    fs.writeFileSync('./src/data/users.json', data);
    result = { status: 'user created', token, email, role };
  }
  return {
    result,
  };
};

export const loginWithUserPass = (
  email: string,
  password: string
): false | UserWithOutPasswordType => {
  const users = getUsers();
  const user = users.filter(
    (user) => user.email === email && user.password === password
  )[0];
  return user ? userDataExceptPassword(user) : false;
};

export const loginWithToken = (
  token: string
): false | UserWithOutPasswordType => {
  const user = jwtTokenChecker(token);
  console.log('-----------');
  console.log('user: ', user);

  return user ? userDataExceptPassword(user) : false;
};

export const userDataExceptPassword = (userData: UserAccountType) => {
  const { password, ...otherData } = userData;

  return otherData;
};
