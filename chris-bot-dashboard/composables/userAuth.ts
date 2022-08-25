import { IUser } from "~~/types/IUser";

export default async ():Promise<IUser> => {
  const user = useState<IUser>('user')

  const { data: userData } = await useFetch<IUser>('/api/v1/discord/auth');
  user.value = userData.value
  return user.value
};
