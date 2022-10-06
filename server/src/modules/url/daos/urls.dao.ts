import { CreateUrlDto } from '../dtos/create.url.dto';
import { PutUrlDto } from '../dtos/put.url.dto';
import debug from 'debug';
import mongooseService from '../../../common/services/mongoose.service';
import shortid from 'shortid';

const log: debug.IDebugger = debug('app:mongodb-dao');

class UrlsDao {
  Schema = mongooseService.getMongoose().Schema;

  urlSchema = new this.Schema({
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      default: shortid.generate(),
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  });

  Url = mongooseService.getMongoose().model('Url', this.urlSchema);

  constructor() {
    log('Create new instance of UrlsDao');
  }

  async createUrl(fullUrl: CreateUrlDto) {
    console.log(fullUrl);
    const url = new this.Url({
      ...fullUrl,
    });
    await url.save();
    return url;
  }
}

export default new UrlsDao();
