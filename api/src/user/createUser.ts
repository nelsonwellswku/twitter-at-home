import { appRedisClient } from '@src/database/appRedisClient.js';
import { makeUserKey } from '@src/database/keys.js';

type CreateUser = {
  userId: string,
  firstName: string,
  lastName: string,
}

export const createUser = async (createUser: CreateUser): Promise<void> => {
  const userKey = makeUserKey(createUser.userId);
  await appRedisClient.json.set(userKey, '$', createUser, {
    NX: true,
  });
}
