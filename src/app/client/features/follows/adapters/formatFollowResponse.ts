import { Follow, FollowResponse } from "../types"

const formatFollowResponse = (res: FollowResponse): Follow => {
  return {
    id: res.id,
    follower: {
      id: res.follower.id,
      name: res.follower.name,
      username: res.follower.username,
      email: res.follower.email,
      image: res.follower.image,
      createdAt: res.follower.createdAt
    },
    following: {
      id: res.follower.id,
      name: res.follower.name,
      username: res.follower.username,
      email: res.follower.email,
      image: res.follower.image,
      createdAt: res.follower.createdAt
    },
    createdAt: res.createdAt,
  }
}
export default formatFollowResponse