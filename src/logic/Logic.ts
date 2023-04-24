import Data from '$/data/Data';
import UserLogic from './UserLogic/UserLogic';

export default class Logic {
  constructor(private data: Data) {
    new UserLogic(data);
  }

  public static async set(data: Data) {
    return new Logic(data);
  }
}
