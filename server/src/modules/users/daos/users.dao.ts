import { CreateUserDto } from '../dtos/create.user.dto';
import { PutuserDto } from '../dtos/put.user.dto';
import debug from 'debug';
import mongooseService from '../../../common/services/mongoose.service';

const log: debug.IDebugger = debug('app:mongodb-dao');

class UsersDao {
  users: Array<CreateUserDto> = [];

  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema(
    {
      email: String,
      fullname: String,
      password: { type: String, select: false },
    },
    { timestamps: true }
  );

  User = mongooseService.getMongoose().model('User', this.userSchema);

  constructor() {
    log('Create new instance of UsersDao');
  }
}

export default new UsersDao();
