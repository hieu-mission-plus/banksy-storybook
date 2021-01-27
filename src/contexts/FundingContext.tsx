import createDataContext from "./createDataContext"

const initialState = { funding: [] }

const fundingReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_FUNDING":
      return { ...state, funding: action.payload }
    default:
      return state
  }
}

const setFundingData = (dispatch: any) => (funding: any) => {
  dispatch({ type: "SET_FUNDING", payload: funding })
}

export const { Provider, Context } = createDataContext(
  fundingReducer,
  { setFundingData },
  initialState
)
