import UserModels from './users.model';

export const getUserById = async (id: string) => {
  const data = await UserModels.getUserById(id);

  return data;
}

export default {
  getUserById
}
