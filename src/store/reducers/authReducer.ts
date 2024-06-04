interface AuthState {
  token: string | null
}

const initialState: AuthState = {
  token: null,
}

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      }
    case 'REMOVE_TOKEN':
      return {
        ...state,
        token: null,
      }
    default:
      return state
  }
}

export default authReducer
