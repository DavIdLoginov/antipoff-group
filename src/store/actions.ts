export const setToken = (token:string) => {
  localStorage.setItem('token', token)

  return {
    type: 'SET_TOKEN',
    payload: token,
  }
}
export const removeToken = () => ({
  type: 'REMOVE_TOKEN',
})

export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'
export const SET_LIKED_USERS = 'SET_LIKED_USERS'

export const setLikedUsers = (likedUsers: number[]) => ({
  type: SET_LIKED_USERS,
  payload: likedUsers,
})

export const addLike = (userId: number) => ({
  type: ADD_LIKE,
  payload: userId,
})

export const removeLike = (userId: number) => ({
  type: REMOVE_LIKE,
  payload: userId,
})
