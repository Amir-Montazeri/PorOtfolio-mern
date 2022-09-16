import { UserWithOutPasswordType } from '@entities/index';
import { SET_USER } from './actions/actionTypes';

const INITIAL_STATE = null;

type StateType = null | UserWithOutPasswordType;

interface ActionType {
  type: string;
  payload?: UserWithOutPasswordType;
}

const user = (
  state: StateType = INITIAL_STATE,
  action: ActionType
): StateType => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return payload as UserWithOutPasswordType;
    default:
      return state;
  }
};

export default user;
