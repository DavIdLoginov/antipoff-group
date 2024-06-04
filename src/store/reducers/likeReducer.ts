import { ADD_LIKE, REMOVE_LIKE, SET_LIKED_USERS } from '../actions'

interface LikeState {
  likes: {
    likedUsers: number[]
  }
}

const initialState: LikeState = {
  likes: {
    likedUsers: [],
  },
}

const likeReducer = (state = initialState, action: any): LikeState => {
  switch (action.type) {
    case ADD_LIKE:
      const updatedLikedUsersAdd = [
        ...(state.likes.likedUsers || []),
        action.payload,
      ]
      return {
        ...state,
        likes: {
          ...state.likes,
          likedUsers: updatedLikedUsersAdd,
        },
      }
    case REMOVE_LIKE:
      const updatedLikedUsersRemove = (state.likes.likedUsers || []).filter(
        (id: number) => id !== action.payload
      )
      return {
        ...state,
        likes: {
          ...state.likes,
          likedUsers: updatedLikedUsersRemove,
        },
      }
    case SET_LIKED_USERS:
      const likedUsersArray = action.payload || [] 

      return {
        ...state,
        likes: {
          ...state.likes,
          likedUsers: likedUsersArray,
        },
      }
    default:
      return state
  }
}

export default likeReducer
