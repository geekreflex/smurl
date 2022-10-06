import UrlDao from '../daos/urls.dao';
import { CRUD } from '../../../common/interfaces/crud.interface';
import { CreateUrlDto } from '../dtos/create.url.dto';

class UrlServices implements CRUD {
  async create(resource: CreateUrlDto) {
    return UrlDao.createUrl(resource);
  }
}

export default new UrlServices();
