export const CREATE_NOTE = "CREATE_NOTE";
export const TOGGLE_NOTE = "TOGGLE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

export const createNote = (note) => ({
  type: CREATE_NOTE,
  payload: { note },
});

export const toggleNote = (id) => ({
  type: TOGGLE_NOTE,
  payload: { id },
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  payload: { id },
});
