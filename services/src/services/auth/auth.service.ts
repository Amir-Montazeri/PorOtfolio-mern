import fs from 'fs';
import jwt from 'jsonwebtoken';

type UserAccountType = {
  username: string;
  password: string;
  role: string;
  token: string;
};

const getUsers: () => UserAccountType[] = () => {
  let usersAsString = fs.readFileSync('users.json') as unknown as string;
  let parsedUsers = JSON.parse(usersAsString);
  return parsedUsers;
};

const usernameIsExist: (username: string) => Boolean = (username) => {
  const users = getUsers();
  const userExist = users.some((user) => user.username === username);
  return userExist;
};

const jwtTokenChecker: (token: string) => UserAccountType | null = (token) => {
  let result: UserAccountType | null = null;
  const verify = jwt.verify(token, 'secret') as { data: string };
  if (verify) {
    const users = getUsers();
    result = users.filter((user) => user.username === verify.data)[0];
  }
  return result;
};

// Register
export const addUser = (username: string, password: string) => {
  let result = 'loading';
  if (usernameIsExist(username)) {
    result = 'user already exist';
  } else {
    const role: 'user' | 'admin' = username === 'msder_amir' ? 'admin' : 'user';
    const users = getUsers();

    let token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: username,
      },
      'secret'
    );

    let data = JSON.stringify(
      [
        ...users,
        {
          username,
          password,
          role,
          token: token,
        },
      ],
      null,
      2
    );
    fs.writeFileSync('users.json', data);
    result = 'user added!';
  }
  return {
    result,
  };
};

// Login with username and password:
export const loginWithUserPass = (username: string, password: string) => {
  const users = getUsers();
  const user = users.filter(
    (user) => user.username === username && user.password === password
  )[0];
  return user ? prepareUserData(user) : false;
};

// Login with token:
export const loginWithToken = (token: string) => {
  const user = jwtTokenChecker(token);
  let userDataWithOutPassword =
    typeof user === null ? user : prepareUserData(user);
  return userDataWithOutPassword;
};

export const prepareUserData = (userData: UserAccountType) => {
  const { password, ...otherData } = userData;

  return otherData;
};
