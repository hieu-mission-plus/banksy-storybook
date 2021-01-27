import createDataContext from "./createDataContext"

const initialState = { category: "Bubble" }

const categoryReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload }
    default:
      return state
  }
}

const setCategory = (dispatch: any) => (category: any) => {
  dispatch({ type: "SET_CATEGORY", payload: category })
}

export const { Provider, Context } = createDataContext(
  categoryReducer,
  { setCategory },
  initialState
)
