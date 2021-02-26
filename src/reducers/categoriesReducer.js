const initialState = [];

const categoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === "LOAD_CATEGORIES") {
    const newState = payload.categories.map((category) => {
      category.minimum = parseInt(category.minimum);
      return category;
    });
    console.log("LOAD_CATEGORIES", newState);

    return newState;
  } else {
    return state;
  }
};

export default categoriesReducer;
