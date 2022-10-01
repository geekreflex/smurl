import { CreateUserDto } from '../dto/create.user.dto';
import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
  users: Array<CreateUserDto> = [];

  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema(
    {
      _id: String,
      email: String,
      password: { type: String, select: false },
      firstName: String,
      lastName: String,
      permissionFlags: Number,
    },
    { id: false }
  );

  User = mongooseService.getMongoose().model('Users', this.userSchema);

  constructor() {
    log('Create new instance of UsersDao');
  }
}

export default new UsersDao();
