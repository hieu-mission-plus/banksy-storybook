import createDataContext from "./createDataContext"

const initialState = { funding: [] }

const fundingReducer = (state, action) => {
  switch (action.type) {
    case "SET_FUNDING":
      return { ...state, funding: action.payload }
    default:
      return state
  }
}

const setFundingData = dispatch => (funding) => {
  dispatch({ type: "SET_FUNDING", payload: funding })
}

export const { Provider, Context } = createDataContext(
  fundingReducer,
  { setFundingData },
  initialState
)
