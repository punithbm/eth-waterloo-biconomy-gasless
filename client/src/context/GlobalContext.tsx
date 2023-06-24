import { createContext, Dispatch, ReactNode, useReducer } from 'react';

export enum ACTIONS {
  CLEAR_TOAST = 'CLEAR_TOAST',
  SHOW_TOAST = 'SHOW_TOAST',
  HIDE_TOAST = 'HIDE_TOAST',
}

export type TInitialStateType = {
  locale: string;
};

export type TActionType = {
  type: string;
  payload: unknown;
};

const initialState: TInitialStateType = {
  locale: '',
};

export type TGlobalContextType = {
  state: TInitialStateType;
  dispatch: Dispatch<TActionType>;
};
