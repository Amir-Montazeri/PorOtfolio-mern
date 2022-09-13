import fs from 'fs';
import jwt from 'jsonwebtoken';

type UserAccountType = {
  email: string;
  password: string;
  role: string;
  token: string;
};
type UserReturningType = {
  email: string;
  role: string;
  token: string;
};

const getUsers: () => UserAccountType[] = () => {
  let usersAsString = fs.readFileSync('users.json') as unknown as string;
  let parsedUsers = JSON.parse(usersAsString);
  return parsedUsers;
};

const usernameIsExist: (email: string) => Boolean = (email) => {
  const users = getUsers();
  const userExist = users.some((user) => user.email === email);
  return userExist;
};

const jwtTokenChecker: (token: string) => UserAccountType | null = (token) => {
  let result: UserAccountType | null = null;
  const verify = jwt.verify(token, 'secret') as { data: string };
  if (verify) {
    const users = getUsers();
    result = users.filter((user) => user.email === verify.data)[0];
  }
  return result;
};

// Register
export const addUser = (email: string, password: string) => {
  let result = 'loading';
  if (usernameIsExist(email)) {
    result = 'user already exist';
  } else {
    const role: 'user' | 'admin' = email === 'msder_amir' ? 'admin' : 'user';
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
    fs.writeFileSync('users.json', data);
    result = 'user added!';
  }
  return {
    result,
  };
};

// Login with email and password:
export const loginWithUserPass = (email: string, password: string) => {
  const users = getUsers();
  const user = users.filter(
    (user) => user.email === email && user.password === password
  )[0];
  return user ? prepareUserData(user) : false;
};

// Login with token:
export const loginWithToken = (token: string) => {
  const user = jwtTokenChecker(token);
  type userType = typeof user;

  let userDataWithOutPassword = (): UserReturningType | null => {
    if (user) {
      return prepareUserData(user);
    }
    return user;
  };
  return userDataWithOutPassword();
};

export const prepareUserData = (userData: UserAccountType) => {
  const { password, ...otherData } = userData;

  return otherData;
};
