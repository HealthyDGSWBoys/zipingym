import Data from '$/data/Data';
import DefaultLogic from './Logic/Logic';
import UserLogic from './UserLogic/UserLogic';

export default class Logic {
  constructor(private data: Data) {
    new UserLogic(data);
    new DefaultLogic(data);
  }

  public static async set(data: Data) {
    return new Logic(data);
  }
}
