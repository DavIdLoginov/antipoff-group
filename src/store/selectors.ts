export const isUserLiked = (
  state: { likes: { likedUsers?: number[] } }, 
  userId: number
): boolean | undefined => {
  return state.likes.likedUsers && state.likes.likedUsers.includes(userId)
}
