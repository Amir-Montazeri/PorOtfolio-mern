import fs from 'fs';
import jwt from 'jsonwebtoken';
import { ReturnedRegisterUserType } from 'src/../../entities/src/user';
import config from './config.json';

import {
  UserAccountType,
  UserWithOutPasswordType,
} from '../../../../entities/src';

interface JWTVerifyType {
  exp: number;
  data: string;
  iat: number;
}

const setUsers = (
  newUserData: UserAccountType,
  prevUsers?: UserAccountType[]
) => {
  const { email, password, role, token } = newUserData;
  const users = getUsers();

  let data = JSON.stringify(
    [
      ...(prevUsers ? prevUsers : users),
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
  fs.writeFileSync(config.usersListPath, data);
};

const getUsers: () => UserAccountType[] = () => {
  let usersAsString = fs.readFileSync(
    config.usersListPath
  ) as unknown as string;
  let parsedUsers = JSON.parse(usersAsString);

  return parsedUsers;
};

const usernameIsExist: (email: string) => Boolean = (email) => {
  const users = getUsers();
  const userExist = users.some((user) => user.email === email);
  return userExist;
};

const generateNewToken = (email: string): string => {
  let users = getUsers();
  const currentUser = users.filter((user) => user.email === email)[0],
    otherUsers = users.filter((user) => user.email !== email);

  let newToken = jwt.sign(
    {
      data: currentUser.email,
    },
    'secret',
    {
      expiresIn: config.jwtTokenExp,
    }
  );

  setUsers({ ...currentUser, token: newToken }, otherUsers);

  return newToken;
};

const jwtTokenChecker = (token: string): UserAccountType | false => {
  let result: UserAccountType | false = false;
  const users = getUsers(),
    user = users.filter((user) => user.token === token)[0];

  const verify: JWTVerifyType = jwt.verify(
    user.token,
    'secret'
  ) as JWTVerifyType;

  if (verify) {
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

    let token = jwt.sign(
      {
        data: email,
      },
      'secret',
      {
        expiresIn: config.jwtTokenExp,
      }
    );

    setUsers({ email, password, role, token });
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
  let token: string = '';
  if (user) {
    token = user.token;

    try {
      jwt.verify(user.token, 'secret') as JWTVerifyType;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        token = generateNewToken(user.email);
      }
    }
  }
  return user ? userDataExceptPassword({ ...user, token }) : false;
};

export const loginWithToken = (
  token: string
): false | UserWithOutPasswordType => {
  const user = jwtTokenChecker(token);

  return user ? userDataExceptPassword(user) : false;
};

export const userDataExceptPassword = (userData: UserAccountType) => {
  const { password, ...otherData } = userData;

  return otherData;
};
