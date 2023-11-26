import DataLoader from 'dataloader';
import { appRedisClient } from './appRedisClient.js';
import { UserDocument } from './documentTypes.js';
import { makeUserKey } from './keys.js';

export class UserDataSource {
  constructor(private redisClient: typeof appRedisClient) {}

  private batchUsers = new DataLoader(
    async (ids: string[]): Promise<UserDocument[]> => {
      const userKeys = ids.map((id) => makeUserKey(id));
      const userDocuments = (
        await this.redisClient.json.mGet(userKeys, '$')
      ).flat();
      return userDocuments as UserDocument[];
    },
  );

  async getUser(id: string): Promise<UserDocument> {
    return await this.batchUsers.load(id);
  }
}
