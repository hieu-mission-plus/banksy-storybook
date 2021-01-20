import createDataContext from "./createDataContext"
import { tree } from "../data"

const initialState = { loading: false, tree, activeNode: null }

const taxonomyReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_NODE":
      return { ...state, activeNode: action.payload }
    default:
      return state
  }
}

const setActiveNode = dispatch => node => {
  dispatch({ type: "SET_ACTIVE_NODE", payload: node })
}

export const { Provider, Context } = createDataContext(
  taxonomyReducer,
  { setActiveNode },
  initialState
)
