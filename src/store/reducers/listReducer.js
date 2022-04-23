import { CREATE_NOTE, DELETE_NOTE, TOGGLE_NOTE } from "../actions/listAction";

const filterList = (id, list) => {
  return Object.entries(list).reduce((prev, [_id, _note]) => {
    if (_id !== id) {
      prev[_id] = _note;
    }

    return prev;
  }, {});
};

const initialState = {
  list: {},
};

export const listReducer = (state = initialState, action) => {
  if (action.type === CREATE_NOTE) {
    const note = action.payload.note;

    return {
      list: {
        ...state.list,
        [note.id]: note,
      },
    };
  }

  if (action.type === TOGGLE_NOTE) {
    const id = action.payload.id;
    const note = state.list[id];

    return {
      list: {
        ...filterList(id, state.list),
        [id]: {
          ...note,
          isDone: !note.isDone,
        },
      },
    };
  }

  if (action.type === DELETE_NOTE) {
    const id = action.payload.id;

    return {
      list: filterList(id, state.list),
    };
  }

  return state;
};
