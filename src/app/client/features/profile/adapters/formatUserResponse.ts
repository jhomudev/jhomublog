import { UserResponse, User } from "../types";

const formatUserReponse = (res: UserResponse): User =>  { 
  return {
    id: res.id,
    name: res.name,
    email: res.email,
    image: res.image
  }
}

export default formatUserReponse