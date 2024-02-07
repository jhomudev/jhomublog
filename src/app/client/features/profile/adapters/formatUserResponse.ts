import { UserResponse, User } from "../types";

const formatUserReponse = (res: UserResponse): User =>  { 
  return {
    id: res.id,
    username: res.username,
    name: res.name,
    email: res.email,
    image: res.image,
    createdAt: res.createdAt,
    _count: {
      followers: res._count.followers,
      following: res._count.following
    }
  }
}

export default formatUserReponse