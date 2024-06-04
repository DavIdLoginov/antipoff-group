export interface User {
  id: number;
  email: string;
  name: string;
  username: string;
  phone: string;
  website: string;
}

export interface UserCardProps {
  id: number
  avatar: string
  name: string
  liked: boolean
  onLike: () => void
  email: string
  onUserClick: (user: any) => void
}