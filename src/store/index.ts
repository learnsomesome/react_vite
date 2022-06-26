import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { audioReducer, IAudioState } from "./reducers/audioReducer";
import { IListState, listReducer } from "./reducers/listReducer";

export type IRootState = {
  audioReducer: IAudioState;
  listReducer: IListState;
};

const reducers = combineReducers<IRootState>({
  audioReducer,
  listReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
