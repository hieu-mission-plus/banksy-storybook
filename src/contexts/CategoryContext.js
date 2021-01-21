import createDataContext from "./createDataContext"

const initialState = { category: "Bubble" }

const categoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload }
    default:
      return state
  }
}

const setCategory = dispatch => category => {
  dispatch({ type: "SET_CATEGORY", payload: category })
}

export const { Provider, Context } = createDataContext(
  categoryReducer,
  { setCategory },
  initialState
)
