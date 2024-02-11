import { FollowingResponse, Following } from "../types";

const formatFollowingResponse = (res: FollowingResponse): Following =>  { 
  return {
    id: res.id,
    user: {
      id: res.following.id,
      username: res.following.username,
      email: res.following.email,
      name: res.following.name,
      image: res.following.image,
      createdAt: res.following.createdAt,
    },
    createdAt: res.createdAt,
  }
}

export default formatFollowingResponse