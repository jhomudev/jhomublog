import { FollowerResponse, Follower } from "../types";

const formatFollowerResponse = (res: FollowerResponse): Follower =>  { 
  return {
    id: res.id,
    user: {
      id: res.follower.id,
      username: res.follower.username,
      email: res.follower.email,
      name: res.follower.name,
      image: res.follower.image,
      createdAt: res.follower.createdAt,
    },
    createdAt: res.createdAt,
  }
}

export default formatFollowerResponse