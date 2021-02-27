const initialState = {};

const allocationsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === "LOAD_ALLOCATIONS") {
    // initialize allocations with default value 0, in 2 d.p.
    const newState = payload.categories.reduce(
      (obj, item) => ((obj[item.category] = item.minimum), obj),
      {}
    );

    console.log("LOAD_ALLOCATIONS", newState);

    return newState;
  } else if (type === "UPDATE_ALLOCATION") {
    console.log("UPDATE_ALLOCATION", payload);
    return { ...state, [payload.category]: payload.allocation };
  } else {
    return state;
  }
};

export default allocationsReducer;
