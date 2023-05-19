import AppRedisClient from '@src/database/AppRedisClient.js';
import { makeUserKey } from '@src/database/keys.js';

type CreateUser = {
  userId: string,
  firstName: string,
  lastName: string,
}

export const createUser = async (createUser: CreateUser): Promise<void> => {
  const userKey = makeUserKey(createUser.userId);
  await AppRedisClient.jsonSet(userKey, '$', JSON.stringify(createUser), 'NX');
}
